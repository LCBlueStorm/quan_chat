var QuanMember = require('./models/quan_member')

var cache = {};

var qm = {
    quan_id: 1,
    user_id: 1
}

quan_member = new QuanMember(qm);

quan_member.save(function(err,rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
})

QuanMember.getMembers(1,function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});

QuanMember.deleteMember(1, 2,function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);

    }
});
