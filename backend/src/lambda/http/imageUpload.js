const AWS = require("aws-sdk");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE;
const bucket = process.env.IMAGE_S3_BUCKET;
const url_expiration = process.env.SIGNED_URL_EXPIRATION;
const uuid = require("uuid");

module.exports.imageUpload = async (event) => {
  const loanId = event.pathParameters.loanId;

  const imageId = uuid.v4();

  const s3 = new AWS.S3({
    signatureVersion: "v4",
  });

  // Return a signed URL to upload a file to the S3 bucket
  const url = s3.getSignedUrl("putObject", {
    Bucket: bucket,
    Key: imageId,
    // Expires: url_expiration,
    Expires: 300,
  });

  const imageUrl = `https://${bucket}.s3.amazonaws.com/${imageId}`;

  // Update the loan item in DynamoDB to include the image URL
  const updateUrlOnLoanItem = {
    TableName: loanTable,
    Key: { loanId },
    UpdateExpression: "set imageUrl = :url",
    ExpressionAttributeValues: {
      ":url": imageUrl,
    },
  };

  await docClient.update(updateUrlOnLoanItem).promise();

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      imageUrl,
      signedUrl: url,
    }),
  };
};
