import React from "react";

export default function ImageUploadButton({ id, user, setUser }) {
  const userDetail = user;
  const setUserDetail = setUser;

  //  Get all loans by a user from DynamoDB. This will update state and re-render UI
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
    // setFetchedData(!false);
    if (userDetail !== undefined) {
      console.log(userDetail.items);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const loanId = id;

    // Get signed Url
    const url = `https://bztmjaum2a.execute-api.us-east-1.amazonaws.com/dev/loan/${loanId}/image`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        Key: "demo-file",
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    // Upload file to S3 using the newly generated signed Url
    const upload = await fetch(responseData.signedUrl, {
      method: "PUT",
      mode: "cors",
      body: file,
    });

    const uploadData = await upload;

    if (uploadData.status === 200) {
      getLoans();
    }

    // getLoans();
  };
  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e)} />
    </div>
  );
}
