import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateItemForm(props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user, isAuthenticated } = useAuth0();

  // Get request to create a new loan request
  const createLoanRequest = async (data) => {
    const url =
      "https://bztmjaum2a.execute-api.us-east-1.amazonaws.com/dev/loan";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      amount,
      userId: user.sub,
    };
    // Call function
    createLoanRequest(requestBody);

    setName("");
    setAmount("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
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
            type="text"
            name="amount"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
