var db          = require('../helpers/db')
var tokenHelper = require('../helpers/token')

module.exports = { getAllUsers, getUserByID, getMyProfile }

function getAllUsers(req, res) {
    db.findAllUsers(function(err, result) {
        if (err) return res.status(400).json(err.message)

        res.json(result)
    })

    console.log('db: getting all users')
}

function getUserByID(req, res) {
    var token = req.swagger.params.auth.value
    tokenHelper.verify(token, function(isVerified) {
        if (isVerified) {
            var id = req.swagger.params.id.value
            db.findUserByID(id, function(err, result) {
                if (err) return res.status(400).json(err.message)
                res.json(result)
            })
        } else {
            res.status(400).json({message: "unauthorized token"})
        }
    })
}

function getMyProfile(req, res) {
    var token = req.swagger.params.auth.value
    tokenHelper.verify(token, function(isVerified) {
        if (isVerified) {
            var id = tokenHelper.userIDFrom(token)
            db.findUserByID(id, function(err, result) {
                if (err) return res.status(400).json(err.message)
                res.json(result)
            })
        } else {
            res.status(400).json({message: "unauthorized token"})
        }
    })
}
