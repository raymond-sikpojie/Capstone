const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
//  const {createLoan} = require("../../businessLogic/loan")

const uuid = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;

module.exports.createLoanRequest = async (event) => {
  const { name, amount, userId } = JSON.parse(event.body);

  const loanId = uuid.v4();

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

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message: "Your function executed successfully!",
      item: item,
    }),
  };
};
