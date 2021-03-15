import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUploadButton from "../components/ImageUploadButton";
import CreateItemForm from "../components/CreateItemForm";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [userDetail, setUserDetail] = useState(undefined);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("component did mount");

      //  Get all loans by a user from DynamoDB
      const getLoans = async () => {
        const request = await fetch(
          "https://bztmjaum2a.execute-api.us-east-1.amazonaws.com/dev/loan",
          {
            method: "GET",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Authorization: user.sub,
            },
          }
        );
        const responseData = await request.json();
        setUserDetail(responseData);
        setFetchedData(!false);
        if (userDetail !== undefined) {
          console.log(userDetail.items);
        }
      };

      getLoans();
    }
  }, [fetchedData]);

  const handleDelete = async (loanId) => {
    const url = `https://bztmjaum2a.execute-api.us-east-1.amazonaws.com/dev/loan/${loanId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  const ShowUser = () => {
    const userData = userDetail.items;
    const userInfo = userData.map((user) => {
      return (
        <div key={user.loanId}>
          <p>{user.name}</p>
          <p>{user.amount}</p>
          {user.approved ? <p>Approved</p> : <p>Unapproved</p>}
          {user.imageUrl ? <img src={user.imageUrl} alt="invoice" /> : null}
          <ImageUploadButton id={user.loanId} />
          <button onClick={() => handleDelete(user.loanId)}>Delete</button>
        </div>
      );
    });

    return <div>{userInfo}</div>;
  };

  return isAuthenticated && userDetail ? (
    <div>
      <CreateItemForm user={userDetail} />
      {/* <ImageUploadButton user={userDetail} /> */}
      <ShowUser />
      {/* <ShowUser /> */}

      {/* <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.sub}</p>
            {JSON.stringify(user)} */}
    </div>
  ) : null;
}
