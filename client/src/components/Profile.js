import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUploadButton from "../components/ImageUploadButton";
import CreateItemForm from "../components/CreateItemForm";
import Header from "../components/Header";
import { config } from "../config";
const apiId = config.apiId;

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [userDetail, setUserDetail] = useState(undefined);
  const [fetchedData, setFetchedData] = useState(false);

  // Function to Get all loans by a user from DynamoDB
  const getLoans = async () => {
    const string = user.sub;
    const splitString = string.split("|");
    const userId = splitString[1];

    const request = await fetch(
      `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/user/${userId}`,
      {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
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
    const url = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/loan/${loanId}`;
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
        <div className="loan-item" key={user.loanId}>
          <p>Loan purpose: {user.name}</p>
          <p>Cost: ${user.amount}</p>
          {user.approved ? <p>Status: Approved</p> : <p>Status: Unapproved</p>}
          {user.imageUrl ? <img src={user.imageUrl} alt="invoice" /> : null}

          <ImageUploadButton
            id={user.loanId}
            userDetail={userDetail}
            setUserDetail={setUserDetail}
          />

          <button
            className="delete-btn"
            onClick={() => handleDelete(user.loanId)}
          >
            Delete
          </button>
        </div>
      );
    });

    return <div>{userInfo}</div>;
  };

  return (
    <div>
      <Header />
      {isAuthenticated ? (
        <CreateItemForm user={userDetail} setUser={setUserDetail} />
      ) : null}

      {isAuthenticated && userDetail ? <ShowUser /> : null}
    </div>
  );
}
