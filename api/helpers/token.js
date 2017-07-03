
module.exports = { tokenFrom, userIDFrom, verify }

function tokenFrom(userID) {
    var date = new Date()
    var tokenBase = new Buffer("mision," + userID + "," + date.toDateString())

    return tokenBase.toString('base64')
}

function userIDFrom(token) {
    var tokenBuffer = new Buffer(token, 'base64')
    var tokenBaseComponents = tokenBuffer.toString().split(',')
    return tokenBaseComponents[1]
}

function verify(token, cb) {
    var userID = userIDFrom(token)

    if (userID == null || userID.length == 0) return cb(false)

    require('./db').findUserByID(userID, function(err,result) {
        if (err) return cb(false)
        if (result.length == 0) return cb(false)

        cb(true)
    })
}
