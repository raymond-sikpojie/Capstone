const AWS = require("aws-sdk");
const {DocumentClient} = require("aws-sdk/clients/dynamodb")
//  const createNewRequest = require("../../businessLogic/loan")
const docClient = new AWS.DynamoDB.DocumentClient();
const loanTable = process.env.LOAN_TABLE

module.exports.createLoanRequest = async (event) => {
    // const docClient = new AWS.DynamoDB.DocumentClient();
    // const loanTable = process.env.LOAN_TABLE

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

    const {name, amount} = JSON.parse(event.body)

    const item = {
        userId: 1,
        loanId: Math.random() + 1,
        name,
        amount
        // createdAt: new Date().toISOString(),
        // approved: false,
    }

    const params = {
        TableName: loanTable,
        Item: {
            "loanId": JSON.stringify(Math.random() + 1),
            "name": name,
            "amount": JSON.stringify(amount)
        }
    }

//    await docClient.put({
//         TableName: loanTable,
//         Item: {
//             "loanId": "2",
//             "name": "omon",
//             "amount": "300"
//         }
//     }).promise()

        await docClient.put(params).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Your function executed successfully!',
            // input: event,
            item: item
          },
          null,
          2
        ),
      };


}

// const AWS = require("aws-sdk");
// const {DocumentClient} = require("aws-sdk/clients/dynamodb")
// const createNewRequest = require("../../businessLogic/loan")


// module.exports.createLoanRequest = async (event) => {
//     try{
// // const docClient = new AWS.DynamoDB.DocumentClient();
// // const loanTable = process.env.LOAN_TABLE

//     // const {name, amount} = JSON.parse(event.body)
//     // const todoId = generate a uuid number here
//     // const item = {
//         // userId: 1,
//         // loanId: Math.random() + 1,
//         // name: "omon",
//         // amount: 300
//         // createdAt: new Date().toISOString(),
//         // approved: false,
//     // }

// //     await docClient.put({
// //         TableName: loanTable,
// //         Item: item
// //     }).promise()

//     // const item = await createNewRequest()
    
//     // const item = {
//     //     userId: 1,
//     //     loanId: Math.random() + 1,
//     //     name: "omon",
//     //     amount: 300
//     // }

//     // const parsedItem = JSON.parse(item)

//     // return {
//     //     statusCode: 201,
//     //     headers: {
//     //       'Access-Control-Allow-Origin': '*',
//     //       'Access-Control-Allow-Credentials': true
//     //     },
//     //     body: JSON.stringify({
//     //       item: item
//     //     })
//     //   }

//     return {
//         statusCode: 200,
//         body: JSON.stringify(
//           {
//             message: 'Go Serverless v1.0! Your function executed successfully!',
//             input: event,
//           },
//           null,
//           2
//         ),
//       };

//     } catch(error){
//         console.log(error.message)
//     }

// }