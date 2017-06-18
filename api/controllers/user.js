var db = require('../helpers/db')

module.exports = { getAllUsers, getUserByID }

function getAllUsers(req, res) {
    console.log('db: getting all users')

    db.findAllUsers(function(err, result) {
        if (err) return res.json(err.message)

        res.json(result)
    })
}

function getUserByID(req, res) {
    console.log('get user by id (' + id + ')')

    var id = req.swagger.params.id.value

    db.findUserByID(id, function(err, result) {
        if (err) return res.json(err.message)
        res.json(result)
    })
}
