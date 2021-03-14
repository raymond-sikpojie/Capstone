const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
//  const createNewRequest = require("../../businessLogic/loan")
const uuid = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;

// const createLoan = require("../../businessLogic/loan");
// import createLoan from "../../businessLogic/loan";

module.exports.createLoanRequest = async (event) => {
  const { name, amount } = JSON.parse(event.body);
  // const itemObj = { name, amount };

  const loanId = uuid.v4();
  // const userId = event.headers.Authorization;
  const userId = "auth0|60489a3c5797dc00688a8550";

  const item = {
    userId,
    loanId,
    name,
    amount,
    approved: false,
    imageUrl: null,
    // createdAt: new Date().toISOString(),
  };

  const params = {
    TableName: loanTable,
    Item: item,
  };

  await docClient.put(params).promise();

  // createLoan(userId, itemObj);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Your function executed successfully!",
      item: item,
    }),
  };
};
