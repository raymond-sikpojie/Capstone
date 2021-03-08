const AWS = require("aws-sdk");
const {DocumentClient} = require("aws-sdk/clients/dynamodb")

const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE

module.exports.createLoanRequest = async (event) => {
    try{

    // const {name, amount} = JSON.parse(event.body)
    // // const todoId = generate a uuid number here
    // const item = {
    //     userId: 1,
    //     loanId: Math.random() + 1,
    //     name,
    //     amount
    //     // createdAt: new Date().toISOString(),
    //     // approved: false,
    // }

    // await docClient.put({
    //     TableName: loanTable,
    //     Item: item
    // }).promise()
    
    // return {
    //     statusCode: 201,
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Credentials': true
    //     },
    //     body: JSON.stringify({
    //       item: "New loan request added"
    //     })
    //   }

    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
          },
          null,
          2
        ),
      };

    } catch(error){
        console.log(error.message)
    }

}