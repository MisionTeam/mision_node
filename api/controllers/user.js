var db    = require('../helpers/db')

module.exports = { getAllUsers, getUserByID }

function getAllUsers(req, res) {
    db.findAllUsers(function(err, result) {
        if (err) return res.status(400).json(err.message)

        res.json(result)
    })

    console.log('db: getting all users')
}

function getUserByID(req, res) {
    var token = req.swagger.params.auth.value
    require('../helpers/token').verify(token, function(isVerified) {
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

}
