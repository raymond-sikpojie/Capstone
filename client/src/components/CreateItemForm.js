import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const apiId = process.env.REACT_APP_API_ID;

export default function CreateItemForm(props) {
  const [name, setName] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const { user, isAuthenticated } = useAuth0();

  // const [fetchedData, setFetchedData] = useState(false);
  const userDetail = props.user;
  const setUserDetail = props.setUser;

  // Get request to create a new loan request
  const createLoanRequest = async (data) => {
    const url = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/loan`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  //  Get all loans by a user from DynamoDB
  const getLoans = async () => {
    const request = await fetch(
      `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/loan`,
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
    // setFetchedData(!false);
    if (userDetail !== undefined) {
      console.log(userDetail.items);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || amount === "") {
      return;
    }

    const requestBody = {
      name,
      amount,
      userId: user.sub,
    };
    // Call function to create a new loan request item
    createLoanRequest(requestBody);

    setName("");
    setAmount("");

    getLoans(); //Running this function to get all the user's items causes a change in state which will re-render the UI
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Expense
          <input
            type="text"
            name="expense"
            placeholder="Expense"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}
