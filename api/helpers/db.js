var mysql = require('mysql')

module.exports = { findAllUsers, findUserByID, findUserByFacebookID, createUser }

var mysqlCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "mision_db"
})

function findAllUsers(cb) {
    var sql = "select * from user"
    mysqlCon.query(sql, function(err, result) {
        cb(err, result)
    })
}

function findUserByID(id, cb) {
    var sql = "select * from user where id=" + "'" + id + "'"
    mysqlCon.query(sql, function(err, result) {
        cb(err, result)
    })
}

function findUserByFacebookID(id, cb) {
    var sql = "select * from user where facebookID=" + "'" + id + "'"
    mysqlCon.query(sql, function(err, result){
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

    mysqlCon.query(sql, [value], function(err, result) {
        cb(err, result)
    })
}