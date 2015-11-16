var moment = require('moment');
var db_pool = require('../db/db_connection_pool');

function QuanMember(member) {
    this.quan_id = member.quan_id; 
    this.user_id = member.user_id;
};

module.exports = QuanMember;

//保存
QuanMember.prototype.save = function save(callback) { 
    var date = moment().format("YYYY-MM-DD h:mm:ss");
    var relative = {
        user_id: this.user_id,
        quan_id: this.quan_id,
        created_at: date, 
    };
    
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "INSERT INTO quan_members SET ?"
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

};


//查询
function get(column, value, callback){
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "SELECT user_id, quan_id, created_at FROM quan_members WHERE ?? = ? and status=1 "
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
QuanMember.getMembers = function getMembers(quan_id, callback){
    get('quan_id', quan_id, callback);
};

//更新
function update(column, value, id, callback){
    
}
QuanMember.deleteMember = function deleteMember(quan_id, user_id, callback){
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "UPDATE quan_members SET status=0 WHERE quan_id = ? and user_id = ?";
        conn.query(sql, [quan_id, user_id], function(err,rows){
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


