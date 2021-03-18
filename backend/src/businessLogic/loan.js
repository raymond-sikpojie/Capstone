const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;
const uuid = require("uuid");

async function createLoan(userId, name, amount) {
  const loanId = uuid.v4();

  const item = {
    userId,
    loanId,
    name,
    amount,
    approved: false,
    // createdAt: new Date().toISOString(),
  };

  const params = {
    TableName: loanTable,
    Item: item,
  };

  await docClient.put(params).promise();
}

module.exports = {
  createLoan,
};
