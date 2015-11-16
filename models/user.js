var moment = require('moment');
var db_pool = require('../db/db_connection_pool');

function User(user) {
    this.name = user.name; 
    this.password = user.password;
    this.sex = user.sex;
    this.age = user.age;
    this.city = user.city;
    this.qq = user.qq;
    this.email = user.email;
    this.tel = user.tel;
    this.extra = user.extra;
};

module.exports = User;

//保存
User.prototype.save = function save(callback) { 
    var date = moment().format("YYYY-MM-DD h:mm:ss");
    var user = {
        name: this.name,
        password: this.password,
        sex: this.sex,
        age: this.age,
        city: this.city,
        qq: this.qq,
        email: this.email,
        tel: this.tel,
        created_at: date,
        extra: this.extra 
    };
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "INSERT INTO users SET ?"
        conn.query(sql, user, function(err,rows){
            if (err){
                console.log("save error ==> " + err);
                conn.release();
                return callback(err);
            } 
            conn.release();
            callback(err, rows);
        });
    });
};

//查询
function get(column, value, callback){
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "SELECT * FROM users WHERE ?? = ? "
        conn.query(sql, [column, value], function(err,rows){
            if (err){
                console.log("get error ==> " + err);
                conn.release();
                return callback(err);
            } 
            conn.release();
            return callback(err, rows);
        });
    });
}
User.getUserByName = function getUserByName(username, callback) {
    get('name', username, callback);
};

User.getUserById = function getUserById(id, callback) {
    get('id', id, callback);
};

//更新
function update(column, value, id, callback){
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "UPDATE users SET ??=? WHERE id = ? ";
        conn.query(sql, [column, value, id], function(err,rows){
            if (err){
                console.log("get error ==> " + err);
                conn.release();
                return callback(err);
            } 
            conn.release();
            return callback(err, rows);
        });
    });
}
User.updateUser = function updateUser(user, id, callback) {
    var attrArray = ['name','sex','age','city','tel','qq','email', 'extra']
    for(var attr in user){
        if(attrArray.indexOf(attr) != -1){
            update(attr, user[attr], id, callback);
        }
    }
};
User.updateUserStatus = function updateUserStatus(status, id, callback){
    update('status', status, id, callback);
}
User.updateUserPassword = function updateUserPassword(password, id, callback){
    update('password', password, id, callback);
}

