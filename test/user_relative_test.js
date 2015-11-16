var UserRelative = require('./models/user_relative');

var ur = {
    user_id: 1,
    friend_id: 2
}

user_relative = new UserRelative(ur);
user_relative.save(function(err, rows){
     if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});

UserRelative.getFriends(1, function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});

UserRelative.deleteFriend(1, 2, function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});

