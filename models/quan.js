var moment = require('moment');
var db_pool = require('../db/db_connection_pool');

function Quan(quan) {
    this.name = quan.name; 
    this.type = quan.type;
    this.introduce = quan.introduce;
    this.creator_id = quan.creator_id;
};

module.exports = Quan;

//保存
Quan.prototype.save = function save(callback) { 
    var date = moment().format("YYYY-MM-DD h:mm:ss");
    var quan = {
        name: this.name,
        type: this.type,
        introduce: this.introduce,
        creator_id: this.creator_id,
        created_at: date,
    };
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "INSERT INTO quans SET ?"
        conn.query(sql, quan, function(err,rows){
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
        var sql = "SELECT * FROM quans WHERE ?? = ? "
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
};
Quan.getQuanByName = function getQuanByName(username, callback) {
    get('name', username, callback);
};

Quan.getQuanById = function getQuanById(id, callback) {
    get('id', id, callback);
};

Quan.getQuanByCreatorId = function getQuanByCreatorId(creator_id, callback) {
    get('creator_id', creator_id, callback);
};

Quan.getQuanByType = function getQuanByType(type, callback) {
    get('type', type, callback);
};

//更新
function update(column, value, id, id_value, callback){
    db_pool.getConnection(function (err, conn) {
        if (err) {
            console.log("connection error ==> " + err);
            return callback(err);
        }
        var sql = "UPDATE quans SET ??=? WHERE ?? = ? "
        conn.query(sql, [column, value, id, id_value], function(err,rows){
            if (err){
                console.log("updata error ==> " + err);
                conn.release();
                return callback(err);
            } 
            conn.release();
            return callback(err, rows);
        });
    });
};
Quan.updateQuanName = function updateQuanName(value, id, callback){
    update('name', value, 'id', id, callback);
};
Quan.updateQuanType = function updateQuanName(value, id, callback){
    update('type', value, 'id', id, callback);
};
Quan.updateQuanIntroduce = function updateQuanName(value, id, callback){
    update('introduce', value, 'id', id, callback);
};
Quan.updateQuanStatusById = function updateQuanStatusById(value, id, callback){
    update('status', value, 'id', id, callback);
};
Quan.updateQuanStatusByCreatorId = function updateQuanStatusByCreatorId(value, creator_id, callback){
    update('status', value, 'creator_id', creator_id, callback);
};
