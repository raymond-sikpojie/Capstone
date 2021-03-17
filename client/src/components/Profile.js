import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUploadButton from "../components/ImageUploadButton";
import CreateItemForm from "../components/CreateItemForm";
// import EditItem from "../components/EditItem";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [userDetail, setUserDetail] = useState(undefined);
  const [fetchedData, setFetchedData] = useState(false);

  // Function to Get all loans by a user from DynamoDB
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
  };

  useEffect(() => {
    if (isAuthenticated) {
      getLoans();
    }
  }, [fetchedData]);

  const handleDelete = async (loanId) => {
    const url = `https://bztmjaum2a.execute-api.us-east-1.amazonaws.com/dev/loan/${loanId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    // this function updates states and re-renders the UI
    getLoans();
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

          <ImageUploadButton
            id={user.loanId}
            userDetail={userDetail}
            setUserDetail={setUserDetail}
          />

          <button onClick={() => handleDelete(user.loanId)}>Delete</button>
          {/* <button onClick={handleEdit}>Edit</button> */}
        </div>
      );
    });

    return <div>{userInfo}</div>;
  };

  // const handleEdit = () => {
  //   history.push({ EditItem });
  // };

  return isAuthenticated && userDetail ? (
    <div>
      <CreateItemForm user={userDetail} setUser={setUserDetail} />

      <ShowUser />
    </div>
  ) : null;
}
