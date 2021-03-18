const { deleteLoan } = require("../../businessLogic/loan");

module.exports.deleteLoan = async (event) => {
  const loanId = event.pathParameters.loanId;

  await deleteLoan(loanId);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: "Loan deleted",
  };
};
