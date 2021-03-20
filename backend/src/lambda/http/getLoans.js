const { getLoans } = require("../../businessLogic/loan");

module.exports.getAllLoans = async (event) => {
  const userId = event.pathParameters.userId;

  const result = await getLoans(userId);

  const items = result.Items;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      items,
    }),
  };
};
