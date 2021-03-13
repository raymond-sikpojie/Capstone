const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;

module.exports.updateLoan = async (event) => {
  const loanId = event.pathParameters.loanId;
  const { name, amount } = JSON.parse(event.body);

  await docClient
    .update({
      TableName: loanTable,
      Key: {
        loanId,
      },
      UpdateExpression: "set #name = :name, amount = :amount",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":amount": amount,
      },
    })
    .promise();

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: "Item updated",
  };
};
