var facebook = require('../helpers/facebook')
var db       = require('../helpers/db')
var token    = require('../helpers/token')

module.exports = { loginWithFacebook }

function loginWithFacebook(req, res) {
    var facebookToken = req.body.facebookToken

    facebook.verifyUser(facebookToken, function(err, body) {
        if (err) return res.status(400).json({message: err.message})

        if (!body.data.is_valid) return res.status(400).json({message: "invalid facebook token"})

        var userID = body.data.user_id
        db.findUserByFacebookID(userID, function(err, result) {
            if (err) return res.status(400).json({message: err.message})

            if (result.length) return res.json({token: token.tokenFrom(result[0].id)})

            facebook.fetchUserProfile(facebookToken, function(err, body) {
                if (err) return res.status(400).json({message: err.message})

                db.createUser(body, function(err, result) {
                    if (err) return res.status(400).json({message: err.message})

                    res.json({token: token.tokenFrom(result.id)})
                })
            })
        })
    })

    console.log('facebook token: ' + facebookToken)
}
