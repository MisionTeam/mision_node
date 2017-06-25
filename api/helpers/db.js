var mysql = require('mysql')

module.exports = { 
    findAllUsers, 
    findUserByID, 
    findUserByFacebookID, 
    createUser,
    createMission,
    deleteMission,
    updateMission,
    findAllMissions,
    findMissionByID
 }

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "mision_db"
})

// user
function findAllUsers(cb) {
    var sql = "select * from user"
    con.query(sql, function(err, result) {
        cb(err, result)
    })
}

function findUserByID(id, cb) {
    if (!id || id <= 0) return cb(Error("invalid user id"), null)

    var sql = "select * from user where id=" + id
    con.query(sql, function(err, result) {
        cb(err, result)
    })
}

function findUserByFacebookID(id, cb) {
    if (!id || id.length <= 0) return cb(Error("invalid fb id"), null)

    var sql = "select * from user where facebookID=" + "'" + id + "'"
    con.query(sql, function(err, result){
        cb(err, result)
    })
}

function createUser(profile, cb) {
    var sql = "insert into user (facebookID, firstname, lastname, gender, birthday, email, phone, avatar) values ?"

    var value = [[ 
        profile.id, 
        profile.first_name, 
        profile.last_name,
        profile.gender ? profile.gender : "",
        profile.birthday ? profile.birthday : "",
        profile.email ? profile.email : "",
        profile.phone ? profile.phone : "",
        profile.picture.data.url ? profile.picture.data.url : ""
        ]]

    con.query(sql, [value], function(err, result) {
        cb(err, result)
    })
}

// mission
function findAllMissions(cb) {
    var sql = "select * from mission"

    con.query(sql, function(err, result) {
        cb(err, result)
    })
}

function findMissionByID(id, cb) {

    if (!id || id <= 0) return cb(Error("invalid mission id"), null)

    var sql = "select * from mission where id=" + id 

    con.query(sql, function(err, result) {
        cb(err, result)
    })
}

function updateMission(msInfo, cb) {

    if (!msInfo.id || msInfo.id <= 0) {
        return cb(Error("invalid mission id"), null)
    }

    var sql = "update mission set"

    if (msInfo.title && msInfo.title.length > 0) {
        sql += " title='" + msInfo.title + "'"
    }

    if (msInfo.description) {
        sql += ", description='" + msInfo.description + "'"
    }

    if (msInfo.price) {
        sql += ", price=" + msInfo.price
    }

    if (msInfo.authorID) {
        sql += ", authorID=" + msInfo.authorID
    }

    if (msInfo.accepterID) {
        sql += ", accepterID=" + msInfo.accepterID
    }

    if (msInfo.dueDate) {
        sql += ", dueDate='" + msInfo.dueDate + "'"
    }

    if (msInfo.lat) {
        sql += ", lat=" + msInfo.lat 
    }

    if (msInfo.lng) {
        sql += ", lng=" + msInfo.lng
    }

    if (msInfo.country) {
        sql += ", country='" + msInfo.country + "'"
    }

    if (msInfo.state) {
        sql += ", state='" + msInfo.state + "'"
    }

    if (msInfo.city) {
        sql += ", city='" + msInfo.city + "'"
    }

    if (msInfo.street) {
        sql += ", street='" + msInfo.street + "'"
    }

    if (msInfo.postalCode) {
        sql += ", postalCode='" + msInfo.postalCode + "'"
    }
    
    sql += " where id=" + msInfo.id

    con.query(sql, function(err, result) {
        cb(err, result)
    })
}

function createMission(msInfo, cb) {

    if (!msInfo.title || msInfo.title.length <= 0) {
        cb(Error("invalid mission title"), null)
    }

    if (!msInfo.price || msInfo.price <= 0) {
        cb(Error("invalid mission price"), null)
    }

    if (!msInfo.authorID || msInfo.authorID <= 0) {
        cb(Error("invalid author id"), null)
    }

    if (!msInfo.dueDate || msInfo.dueDate.length <= 0) {
        cb(Error("invalid due date"), null)
    }

    var sql = "insert into mission (title, description, price, authorID, postDate, dueDate, lat, lng) values ?"

    var value = [[ 
        msInfo.title, 
        msInfo.description ? msInfo.description : "",
        msInfo.price,
        msInfo.authorID,
        new Date().toDateString,
        msInfo.dueDate,
        msInfo.lat ? msInfo.lat : null
        msInfo.lng ? msInfo.lng : null
        ]]

    con.query(sql, [value], function(err, result) {
        cb(err, result)
    })
}

function deleteMission(id, cb) {
    if (!id || id <= 0) return cb(Error("invalid mission id"), null)

    var sql = "delete from mission where id=" + id
    con.query(sql, function(err, result) {
        cb(err, result)
    })
}