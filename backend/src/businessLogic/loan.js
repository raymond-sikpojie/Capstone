const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;
const uuid = require("uuid");

export async function createLoan(userId, loanItem) {
  const loanId = uuid.v4();

  const item = {
    userId,
    loanId,
    name: loanItem.name,
    amount: loanItem.amount,
    approved: false,
    // createdAt: new Date().toISOString(),
  };

  const params = {
    TableName: loanTable,
    Item: item,
  };

  await docClient.put(params).promise();
}
