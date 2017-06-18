
module.exports = { tokenFrom, userIDFrom }

function tokenFrom(userID) {
    var date = new Date()
    var tokenBase = new Buffer("mision," + userID + "," + date.toDateString)

    return tokenBase.toString('base64')
}

function userIDFrom(token) {
    var tokenBuffer = new Buffer(token, 'base64')
    var tokenBaseComponents = tokenBuffer.toString.split(",")
    return tokenBaseComponents[1]
}