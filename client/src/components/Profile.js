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

  const handleComplete = async (e) => {
    // console.log(e.target.classList.toggle("complete"));
    e.target.classList.toggle("complete");
    // console.log(e.target);
  };

  const ShowUser = () => {
    const userData = userDetail.items;
    const userInfo = userData.map((user) => {
      return (
        <div className="items-container">
          <div className="loan-item" key={user.loanId}>
            <span onClick={(e) => handleComplete(e)}>
              {/* <i class="far fa-circle"></i> */}
              {/* <input type="checkbox" defaultChecked={false} /> */}
              {/* <img src="./images/icon-check.svg" alt="icon" /> */}
            </span>

            {/* <p>Loan purpose: {user.name}</p> */}
            <p>{user.name}</p>
            <p>{user.amount}</p>
            {/* <p>Cost: ${user.amount}</p> */}
            {/* {user.approved ? <p>Status: Approved</p> : <p>Status: Unapproved</p>}
          {user.imageUrl ? <img src={user.imageUrl} alt="invoice" /> : null} */}

            {/* <ImageUploadButton
            id={user.loanId}
            userDetail={userDetail}
            setUserDetail={setUserDetail}
          /> */}

            <button
              className="delete-btn"
              onClick={() => handleDelete(user.loanId)}
            >
              Remove
            </button>
          </div>
        </div>
      );
    });

    return <div>{userInfo}</div>;
  };

  return (
    <div>
      <div className="section-1">
        <Header />
        {isAuthenticated ? (
          <CreateItemForm user={userDetail} setUser={setUserDetail} />
        ) : null}
      </div>
      <div className="section-2">
        {isAuthenticated && userDetail ? <ShowUser /> : null}
      </div>
    </div>
  );
}
