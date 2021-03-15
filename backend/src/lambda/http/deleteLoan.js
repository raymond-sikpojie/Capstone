const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;

module.exports.deleteLoan = async (event) => {
  const loanId = event.pathParameters.loanId;

  // Delete item from DyanmoDB table
  await docClient
    .delete({
      TableName: loanTable,
      Key: {
        loanId,
      },
    })
    .promise();

  // TODO: Delete item photo from S3 bucket

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: "Loan deleted",
  };
};
