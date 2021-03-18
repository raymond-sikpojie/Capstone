// const apiId = process.env.REACT_APP_API_ID;

// export const getLoans = async (user) => {
//   const request = await fetch(
//     `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/loan`,
//     {
//       method: "GET",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: user.sub,
//       },
//     }
//   );
//   const responseData = await request.json();
//   setUserDetail(responseData);
//   // setFetchedData(!false);
//   if (userDetail !== undefined) {
//     console.log(userDetail.items);
//   }
// };
