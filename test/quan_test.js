var Quan = require('./models/quan');
var q = {
    name: 'quan2',
    type: 'workmate',
    introduce: 'friend',
    creator_id: 15,
}
var quan = new Quan(q);

quan.save(function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
    
});

Quan.getQuanByName('quan2', function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});

Quan.getQuanByCreatorId(15, function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});
Quan.getQuanById(3, function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});
Quan.getQuanByType('workmate', function(err, rows){
    if(err){
        console.log(err);
    }else{
        var len = rows.length
        for(var i=0; i<len; i++){
            console.log(i, rows[i]);
        }
    }
});


Quan.updateQuanName('quan3', 3, function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }

});

Quan.updateQuanType('classmate', 3, function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }

});

Quan.updateQuanIntroduce('aaaaa', 3, function(err, rows){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }

});
