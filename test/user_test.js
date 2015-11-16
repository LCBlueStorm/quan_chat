var User = require('./models/user');

var u = {
    name: 'jay',
    password: 'liu',
    sex: 'male',
    age: 13,
    city: 'shenzhen',
    qq: '22334455',
    email: 'aaa',
    tel: 'aaa',
    extra: 'extra' 
};
var user = new User(u);

//save user test
user.save(function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
    
});

User.getUserByName('jay', function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});
User.getUserById(13, function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});


User.updateUserStatus('deleted', 13, function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});
User.updateUserPassword('mmmmm', 13, function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});
var u = {
    name: 'aaa',
    password: 'aaa',
    sex: 'aaa',
    age: 15,
    city: 'aa',
    qq: '1111',
    email: '111',
    tel: '111',
    extra: 'e111xtra' 
};

User.updateUser(u, 13, function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});
