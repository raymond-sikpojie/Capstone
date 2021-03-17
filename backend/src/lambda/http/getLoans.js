const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;
const userIndex = process.env.USERID_INDEX;

module.exports.getAllLoans = async (event) => {
  const userId = event.headers.Authorization;
  // const userId = event.pathParameters.userId;

  const result = await docClient
    .query({
      TableName: loanTable,
      IndexName: userIndex,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },

      ScanIndexForward: true,
    })
    .promise();

  const items = result.Items;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      items,
    }),
    // body: JSON.stringify({
    //     "item": userId
    // })
  };
};
