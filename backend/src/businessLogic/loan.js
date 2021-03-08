export default async function createNewRequest(userId, itemObject) {
    const item = {
        userId,
        loanId: Math.random() + 1,
        ...itemObject
        // createdAt: new Date().toISOString(),
        // approved: false,
    }

//     await docClient.put({
//         TableName: loanTable,
//         Item: item
//     }).promise()

    return item
}