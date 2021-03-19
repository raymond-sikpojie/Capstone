import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const apiId = process.env.REACT_APP_API_ID;

export default function ImageUploadButton({ id, userDetail, setUserDetail }) {
  const { user } = useAuth0();

  //  Get all loans by a user from DynamoDB. This will update state and re-render UI
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

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const loanId = id;

    // Get signed Url
    const url = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/loan/${loanId}/image`;
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

    getLoans();
  };
  return (
    <div>
      <input
        className="file-upload"
        type="file"
        onChange={(e) => uploadImage(e)}
      />
    </div>
  );
}
