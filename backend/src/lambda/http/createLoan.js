const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const { createLoan } = require("../../businessLogic/loan");

module.exports.createLoanRequest = async (event) => {
  const { name, amount, userId } = JSON.parse(event.body);

  const item = await createLoan(userId, name, amount);

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
