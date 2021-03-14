import React from "react";

export default function ImageUploadButton(props) {
  const uploadImage = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];

    console.log(props.user.items[0].loanId);
    const loanId = props.user.items[0].loanId;

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
    console.log(uploadData);
  };
  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e)} />
    </div>
  );
}
