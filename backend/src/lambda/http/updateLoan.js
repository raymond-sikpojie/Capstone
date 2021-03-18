const { updateLoan } = require("../../businessLogic/loan");

module.exports.updateLoan = async (event) => {
  const loanId = event.pathParameters.loanId;
  const { name, amount } = JSON.parse(event.body);

  await updateLoan(loanId, name, amount);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: "Item updated",
  };
};
