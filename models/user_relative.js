var moment = require('moment');
var db_pool = require('../db/db_connection_pool');

function UserRelative(relative) {
    this.user_id = relative.user_id; 
    this.friend_id = relative.friend_id;
};

module.exports = UserRelative;

//保存
UserRelative.prototype.save = function save(callback) { 
    var date = moment().format("YYYY-MM-DD h:mm:ss");
    var relative = {
        user_id: this.user_id,
        friend_id: this.friend_id,
        created_at: date, 
    };
    var relative1 = {
        friend_id: this.user_id,
        user_id: this.friend_id,
        created_at: date, 
    };
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "INSERT INTO user_relatives SET ?"
        conn.query(sql, relative, function(err,rows){
            if (err){
                console.log("save error ==> " + err);
                conn.release();
                return callback(err);
            } 
            conn.release();
            callback(err, rows);
        });
    });
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "INSERT INTO user_relatives SET ?"
        conn.query(sql, relative1, function(err,rows){
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
        var sql = "SELECT user_id, friend_id, created_at FROM user_relatives WHERE ?? = ? and status=1 "
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
UserRelative.getFriends = function getFriends(user_id, callback){
    get('user_id', user_id, callback);
};

//更新
function update(column, value, id, callback){
    
}
UserRelative.deleteFriend = function deleteFriend(user_id, friend_id, callback){
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "UPDATE user_relatives SET status=0 WHERE user_id = ? and friend_id = ?";
        conn.query(sql, [user_id, friend_id], function(err,rows){
            if (err){
                console.log("get error ==> " + err);
                conn.release();
                return callback(err);
            } 
            conn.release();
            return callback(err, rows);
        });
    });

};


