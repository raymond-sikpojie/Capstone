const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;
const userIndex = process.env.USERID_INDEX;
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

async function deleteLoan(loanId) {
  await docClient
    .delete({
      TableName: loanTable,
      Key: {
        loanId,
      },
    })
    .promise();
}

async function getLoans(userId) {
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

  return result;
}

async function updateLoan(loanId, name, amount) {
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
}

module.exports = {
  createLoan,
  deleteLoan,
  getLoans,
  updateLoan,
};
