var db = require('../helpers/db')
var th = require('../helpers/token')

module.exports = { allMissions, getMissionByID, createMission, editMission, deleteMission }

function allMissions(req, res) {
    var token = req.swagger.params.auth.value
    th.verify(token, function(isVerified) {
        if (isVerified) {
            db.findAllMissions(function(err, result) {
                if (err) return res.status(400).json(err.message)
                res.json(result)
            })
        } else {
            res.status(400).json({message: "unauthorized token"})
        }
    })
}

function getMissionByID(req, res) {
    var token = req.swagger.params.auth.value
    th.verify(token, function(isVerified) {
        if (isVerified) {
            var id = req.swagger.params.id.value
            db.findMissionByID(id, function(err, result) {
                if (err) return res.status(400).json(err.message)
                res.json(result)
            })
        } else {
            res.status(400).json({message: "unauthorized token"})
        }
    })
}

function createMission(req, res) {
    var token = req.swagger.params.auth.value
    th.verify(token, function(isVerified) {
        if (isVerified) {
            var authorID = th.userIDFrom(token)
            var msInfo = req.body
            msInfo.authorID = authorID
            db.createMission(msInfo, function(err, r) {
                if (err) return res.status(400).json(err.message)
                res.status(204).send()
            }) 
        } else {
            res.status(400).json({message: "unauthorized token"})
        }
    })
}

function editMission(req, res) {
    var token = req.swagger.params.auth.value
    th.verify(token, function(isVerified) {
        if (isVerified) {
            var authorID = th.userIDFrom(token)
            var msInfo = req.body
            msInfo.authorID = authorID
            db.updateMission(msInfo, function(err, r) {
                if (err) return res.status(400).json(err.message)
                res.status(204).send()
            }) 
        } else {
            res.status(400).json({message: "unauthorized token"})
        }
    })
}

function deleteMission(req, res) {
    var token = req.swagger.params.auth.value
    th.verify(token, function(isVerified) {
        if (isVerified) {
            var id = req.swagger.params.id.value
            db.deleteMission(id, function(err, r) {
                if (err) return res.status(400).json(err.message)
                res.status(204).send()
            }) 
        } else {
            res.status(400).json({message: "unauthorized token"})
        }
    })
}