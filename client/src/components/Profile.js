import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUploadButton from "../components/ImageUploadButton";

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

  const RenderUser = () => {
    if (userDetail !== undefined) {
      <p>this is a drill</p>;
      // <p>{userDetail.items[0].name}</p>
      // let showUser = userDetail.items
      // {showUser.map((item) => {
      //     return (
      //         <div>
      //         <p>{item.name}</p>
      //         <p>{item.amount}</p>
      //         </div>
      //     )
      // })}
    }
  };

  return isAuthenticated ? (
    <div>
      <p>Successful test</p>
      <ImageUploadButton user={userDetail} />
      {/* <RenderUser /> */}

      {/* <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.sub}</p>
            {JSON.stringify(user)} */}
    </div>
  ) : null;
}
