var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    crypto = require('crypto');
var AccountSchema, Account,AdminAccount,AdminAccountSchema,ArticalSchema,Artical,ActivitySchema,Activity,RecordSchema,Record;

var app = express();

app.configure(function() {
    app.use(express.bodyParser());

    app.use(express.methodOverride());

    app.use(express.static(path.join(application_root, 'site')));

    app.use(express.errorHandler({ dumpException: true, showStack: true }));
});

// 前端接口

/**
 * 后台管理与用户登录相关验证接口
 * @param  {[type]} req    [description]
 * @param  {[type]} res){                 var user [description]
 * @return {[type]}        [description]
 */
app.post('/account/admin/login',function(req,res){
    var user = req.body.username;
    var pwd = req.body.password;
    var user = {
        username: req.body.username,
        password: req.body.password
    };
    AdminAccount.findOne({username:user.username,password:user.password},{name:1},function(err,doc){
        if (doc != null) {
            var resp = {
                ret :1,
                userInfo:doc
            }
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg : '用户名/密码错误'
            }
            res.send(resp);
        }
    })
});
app.post('/account/login', function(req, res) {
    var user = req.body.username;
    var pwd = req.body.password;
    var user = {
        username: req.body.username,
        password: req.body.password
    };
    Account.findOne({ username: user.username, password: user.password }, {name:1,gender:1},function(err, doc) {
        if (doc != null) {
            var resp = {
                ret :1,
                userInfo:doc
            }
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg : '用户名/密码错误'
            }
            res.send(resp);
        }

    });

});

/**
 * 注册接口
 * @param  {[type]} req                 [description]
 * @param  {[type]} res)                {               var user [description]
 * @param  {[type]} function(err,doc){                                         if(doc ! [description]
 * @return {[type]}                     [description]
 */
app.post('/account/register', function(req, res) {

    var user = req.body;
    Account.findOne({username:req.body.username},function(err,doc){
        if(doc != null){
            var resp = {
                ret :0,
                msg : '已存在该账号！'
            }
            res.send(resp);
        }else{
            register(user);
            var resp = {
                ret :1,
                msg : '注册成功，请登录！'
            }
            res.send(resp);
        }
    })
    
});

/**
 * 用户收藏接口
 */

app.post('/userInfo/addRecord',function(req,res){
    Account.update({_id:req.body.user_id},{$push:{'collections':req.body.info}},function(err,doc){
        if(doc == 1){
            var resp = {
                ret :1,
                msg : '收藏成功，可到我的收藏中进行查看！'
            }
            res.send(resp);
        }
    })
});

app.post('/userInfo/record',function(req,res){
    Account.findOne({_id:req.body.id},{collections:1},function(err,doc){
        if(doc != null){
            var resp = {
                ret :1,
                list:doc
            }
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg : '暂时没有相关数据！'
            }
            res.send(resp);
        }
    })
})

/**
 * 修改密码接口
 * @param  {[type]} req                               [description]
 * @param  {[type]} res){                                            var old_pwd [description]
 * @param  {[type]} options._id:1                     [description]
 * @param  {[type]} function(err,doc){                                                          if(doc ! [description]
 * @param  {[type]} options.$set:{password:new_pwd} [description]
 * @param  {[type]} options.upsert:false              [description]
 * @param  {Object} function(err){                                                                                          if(err){                    var resp [description]
 * @return {[type]}                                   [description]
 */
app.post('/account/changePassword',function(req,res){
    var old_pwd = req.body.old_pwd;
    var new_pwd = req.body.new_pwd;
    var id = req.body.id;
    Account.findOne({_id:id,password:old_pwd},{_id:1},function(err,doc){
        if(doc != null){
            Account.update({_id:id},{$set:{password:new_pwd}},{upsert:false},function(err){
                if(err){
                    var resp = {
                        ret :0,
                        msg:err
                    }
                    res.send(resp);
                }else{
                    var resp = {
                        ret :1,
                        msg:'修改成功，请重新登录！'
                    }
                    res.send(resp);
                }
            });
        }else{
            var resp = {
                ret :0,
                msg:'原密码错误，请重新输入！'
            }
            res.send(resp);
        }
    });
});


// 后台接口

/**
 * 用户信息获取接口
 * @param  {[type]} req                 [description]
 * @param  {[type]} res){                              Account.find({} [description]
 * @param  {[type]} options.password:0  [description]
 * @param  {Array}  function(err,doc){                                                   if(doc ! [description]
 * @return {[type]}                     [description]
 */
app.post('/userInfo',function(req,res){
    if(req.body.limit != null){
        var skips = req.body.skip;
        var limits = req.body.limit;
        Account.count({},function(err,count){
            Account.find({},{password:0},{skip:skips*10,limit:limits},function(err,docs){
                if(docs.toString() != ''){
                    var resp = {
                        ret:1,
                        page:Math.floor(count/10)+1,
                        count:count,
                        info:docs.reverse()
                    }
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'暂无数据'
                    };
                    res.send(resp);
                }
            })
        });
        
    }else{
        Account.find({},{password:0},function(err,docs){
            if(docs.toString() != ''){
                var resp = {
                    ret:1,
                    info:docs.reverse()
                }
                res.send(resp);
            }else{
                var resp = {
                    ret :0,
                    msg :'暂无数据'
                };
                res.send(resp);
            }
        })
    }
});

/**
 * 文章相关接口
 * @param  {[type]} req                 [description]
 * @param  {[type]} res){                              var art [description]
 * @param  {[type]} function(err,doc){                                        if(doc ! [description]
 * @return {[type]}                     [description]
 */
app.post('/publish/artical',function(req,res){
    var art = req.body;
    Artical.findOne({title:art.title},function(err,doc){
        if(doc != null){
            var resp = {
                ret :0,
                msg : '已存在同名文章~'
            }
            console.log('发布了同名文章');
            res.send(resp);
        }else{
            publishArt(art);
            var resp = {
                ret :1,
                msg : '发布成功！'
            }
            res.send(resp);
        }
    })
});

app.get('/artical',function(req,res){
    Artical.find({},{artical:0},function(err,doc){
        if(doc.toString() != ''){
            var resp = {
                ret :1,
                list : doc.reverse()
            };
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'暂无数据！'
            };
            res.send(resp);
        }
    });
});

app.post('/artical',function(req,res){
    if(req.body.limit != null){
        var skips = req.body.skip;
        var limits = req.body.limit;
        Artical.count({},function(err,count){
            Artical.find({},null,{skip:skips*10,limit:limits},function(err,docs){
                if(docs.toString() != ''){
                    var resp = {
                        ret:1,
                        page:Math.floor(count/10)+1,
                        count:count,
                        list:docs.reverse()
                    }
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'暂无数据'
                    };
                    res.send(resp);
                }
            })
        });
        
    }else{
        Artical.find({},null,function(err,docs){
            if(docs.toString() != ''){
                var resp = {
                    ret:1,
                    list:docs.reverse()
                }
                res.send(resp);
            }else{
                var resp = {
                    ret :0,
                    msg :'暂无数据'
                };
                res.send(resp);
            }
        })
    }
});

app.post('/artInfo',function(req,res){
    Artical.findOne({_id:req.body.id},function(err,doc){
        if(doc != null){
            var resp = {
                ret :1,
                info : doc
            };
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'文章错误！'
            };
            res.send(resp);
        }
    });
});

app.post('/artInfo/delete',function(req,res){
    Artical.findOne({_id:req.body.id},function(err,doc){
        if(doc != null){
            Artical.remove({_id:req.body.id},function(err,doc){
                if(!err){
                    var resp = {
                        ret :1,
                        msg : '删除成功！'
                    };
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'删除失败错误！'
                    };
                    res.send(resp);
                }
            })
            
        }else{
            var resp = {
                ret :0,
                msg :'文章错误！'
            };
            res.send(resp);
        }
    });
});

app.post('/artInfo/update',function(req,res){
    Artical.findById(req.body.id,function(err,art){
        if(art != null){
            art.title=req.body.title;
            art.date=req.body.date;
            art.author=req.body.author;
            art.summary= req.body.summary;
            art.artical=req.body.artical;
            art.img_src=req.body.img_src;
            art.save();
            var resp = {
                ret :1,
                msg :'修改成功！'
            };
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'文章错误！'
            };
            res.send(resp);
        }
    });
});


/**
 * 活动相关接口
 * @param  {[type]} req                 [description]
 * @param  {[type]} res){                              var act [description]
 * @param  {[type]} function(err,doc){                                        if(doc ! [description]
 * @return {[type]}                     [description]
 */
app.post('/publish/activity',function(req,res){
    var act = req.body;
    Activity.findOne({title:act.title},function(err,doc){
        if(doc != null){
            var resp = {
                ret :0,
                msg : '已存在同名活动~'
            }
            console.log('发布了同名活动');
            res.send(resp);
        }else{
            publishAct(act);
            var resp = {
                ret :1,
                msg : '发布成功！审核通过后就会显示啦~'
            }
            res.send(resp);
        }
    })
});

app.get('/activity',function(req,res){
    Activity.find({},function(err,doc){
        if(doc.toString() != ''){
            var resp = {
                ret :1,
                list : doc.reverse()
            };
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'暂无数据！'
            };
            res.send(resp);
        }
    });
});
app.post('/activity',function(req,res){
    if(req.body.limit != null){
        var skips = req.body.skip;
        var limits = req.body.limit;
        Activity.count({},function(err,count){
            Activity.find({},null,{skip:skips*10,limit:limits},function(err,docs){
                if(docs.toString() != ''){
                    var resp = {
                        ret:1,
                        page:Math.floor(count/10)+1,
                        count:count,
                        list:docs.reverse()
                    }
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'暂无数据'
                    };
                    res.send(resp);
                }
            })
        });
        
    }else{
        Activity.find({},null,function(err,docs){
            if(docs.toString() != ''){
                var resp = {
                    ret:1,
                    list:docs.reverse()
                }
                res.send(resp);
            }else{
                var resp = {
                    ret :0,
                    msg :'暂无数据'
                };
                res.send(resp);
            }
        })
    }
});

app.get('/activity/show',function(req,res){
    Activity.find({show:1},function(err,doc){
        if(doc.toString() != ''){
            var resp = {
                ret :1,
                list : doc.reverse()
            };
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'暂无数据！'
            };
            res.send(resp);
        }
    });
});

app.post('/activity/info',function(req,res){
    Activity.findOne({_id:req.body.id},function(err,doc){
        if(doc != null){
            var resp = {
                ret :1,
                info : doc
            };
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'暂无数据！'
            };
            res.send(resp);
        }
    });
});

app.post('/activity/update',function(req,res){
    Activity.findById(req.body.id,function(err,act){
        if(act != null){
            act.title=req.body.title;
            act.date=req.body.date;
            act.author=req.body.author;
            act.summary= req.body.summary;
            act.type= req.body.type;
            act.site = req.body.site;
            act.show = req.body.show;
            act.save();
            var resp = {
                ret :1,
                msg :'修改成功！'
            };
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'活动错误！'
            };
            res.send(resp);
        }
    });
});

app.post('/activity/delete',function(req,res){
    Activity.findOne({_id:req.body.id},function(err,doc){
        if(doc != null){
            Activity.remove({_id:req.body.id},function(err,doc){
                if(!err){
                    var resp = {
                        ret :1,
                        msg : '删除成功！'
                    };
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'删除失败错误！'
                    };
                    res.send(resp);
                }
            })
            
        }else{
            var resp = {
                ret :0,
                msg :'活动号错误！'
            };
            res.send(resp);
        }
    });
});

/**
 * 用户查询信息记录接口
 */

app.post('/record', function(req, res) {
    var record = req.body;
    publishRec(record);
    var resp = {
        ret: 1
    }
    res.send(resp);
})

app.post('/record/search', function(req, res) {
    if(req.body.time_limit != null){
        var time_limit = req.body.time_limit;
        Record.count({"condition.types":{"$nin":['药房']},"date":{$gte:time_limit}},function(err,count){
            Record.find({"date":{$gte:time_limit},"condition.types":{"$nin":['药房']}},null,function(err,docs){
                if(docs.toString() != ''){
                    var resp = {
                        ret:1,
                        record:docs.reverse(),
                        count:count,
                        page:1
                    }
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'暂无数据'
                    };
                    res.send(resp);
                }
            })
        });
        
    }else if(req.body.limit != ''){
        var skips = req.body.skip;
        var limits = req.body.limit;
        Record.count({"condition.types":{"$nin":['药房']}},function(err,count){
            Record.find({"condition.types":{"$nin":['药房']}},null,{skip:skips*10,limit:limits},function(err,docs){
                if(docs.toString() != ''){
                    var resp = {
                        ret:1,
                        page:Math.floor(count/10)+1,
                        count:count,
                        record:docs.reverse()
                    }
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'暂无数据'
                    };
                    res.send(resp);
                }
            })
        });
    }else{
        Record.count({"condition.types":{"$nin":['药房']}},function(err,count){
            Record.find({"condition.types":{"$nin":['药房']}},null,function(err,docs){
                if(docs.toString() != ''){
                    var resp = {
                        ret:1,
                        record:docs.reverse(),
                        count:count,
                        page:1
                    }
                    res.send(resp);
                }else{
                    var resp = {
                        ret :0,
                        msg :'暂无数据'
                    };
                    res.send(resp);
                }
            })
        });
    }
});

/**
 * 后台修改用户密码及删除用户
 */

 app.post('/back/changePassword',function(req,res){
     var password = req.body.password;
     var id = req.body.id;
     Account.findOne({_id:id},{_id:1},function(err,doc){
         if(doc != null){
             Account.update({_id:id},{$set:{password:password}},{upsert:false},function(err){
                 if(err){
                     var resp = {
                         ret :0,
                         msg:err
                     }
                     res.send(resp);
                 }else{
                     var resp = {
                         ret :1,
                         msg:'修改成功!'
                     }
                     res.send(resp);
                 }
             });
         }else{
             var resp = {
                 ret :0,
                 msg:'Something wrong!'
             }
             res.send(resp);
         }
     });
 });

 app.post('/back/deleteAccount',function(req,res){
    var id = req.body.id;
    Account.remove({_id:id},function(err,doc){
        var resp = {
            ret :1,
            msg:'成功删除该用户!'
        }
        res.send(resp);
    })
 });

/**
 * 数据库连接等相关
 * @type {[type]}
 */
var db = mongoose.createConnection('localhost', 'laoyousuoyi');
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    AccountSchema = new mongoose.Schema({
        username: { type: String, unique: true },
        password: { type: String },
        name: { type: String },
        gender: { type: String },
        birth_year: { type: Number },
        phone: { type: Number },
        hobbies: { type: [] },
        disease: { type: [] },
        collections:{type:[]}
    });
    AdminAccountSchema = new mongoose.Schema({
        username: { type: String, unique: true },
        password: { type: String },
        name: { type: String }
    });
    ArticalSchema = new mongoose.Schema({
        title: { type: String},
        date: { type: String },
        author:{ type: String },
        summary: { type: String },
        artical:{type:[]},
        img_src:{type:String}
    });
    ActivitySchema = new mongoose.Schema({
        title: { type: String},
        date: { type: String },
        locale_time:String,
        author:{ type: String },
        summary: { type: String },
        type:{type:String},
        site:{type:String},
        show:{type:Number}
    });
    RecordSchema = new mongoose.Schema({
        user_id:String,
        date:Number,
        locale_time:String,
        position:{
            lng:Number,
            lat:Number
        },
        condition:{
            types:String,
            detail:String,
            level:String,
            area:String
        }
    });
    Activity = db.model('Activity', ActivitySchema);
    Account = db.model('Account', AccountSchema);
    AdminAccount = db.model('AdminAccount',AdminAccountSchema);
    Artical = db.model('Artical',ArticalSchema);
    Record = db.model('Record',RecordSchema);
});

var register = function(userInfo) {
    var user = new Account({
        username: userInfo.username,
        password: userInfo.password,
        name: userInfo.name,
        gender: userInfo.gender,
        birth_year: userInfo.birth_year,
        phone: userInfo.phone,
        hobbies: userInfo.hobbies,
        disease: userInfo.disease
    });
    user.save(registerCallback);
};

var registerCallback = function(err) {
    if (err) {
        return console.log(err);
    }
    return console.log('Account was created');
};

var checkAccount = function(userInfo) {
    Account.find({ username: userInfo.username, password: userInfo.password }, function(err, doc) {
        if (doc != null) {
            console.log(doc);
        }

    });
};

var publishArt = function(artical){
    var art = new Artical({
        title: artical.title,
        date: artical.date,
        author:artical.author,
        summary: artical.summary,
        artical:artical.artical,
        img_src:artical.img_src
    })
    art.save(publishArtCallback);
};
var publishArtCallback = function(err) {
    if (err) {
        return console.log(err);
    }
    return console.log('Artical was created');
};

var publishAct = function(activity){
    var act = new Activity({
        title: activity.title,
        date: activity.date,
        locale_time:activity.locale_time,
        author:activity.author,
        summary: activity.summary,
        type:activity.type,
        site:activity.site,
        show:activity.show
    })
    act.save(publishActCallback);
};
var publishActCallback = function(err) {
    if (err) {
        return console.log(err);
    }
    return console.log('Activity was created');
};


var publishRec = function(record){
    var rec = new Record({
        user_id:record.id,
        position:record.position,
        date:record.date,
        locale_time:record.locale_time,
        condition:record.condition
    });
    rec.save(publishRecCallback);
};
var publishRecCallback = function(err) {
    if (err) {
        return console.log(err);
    }
    return console.log('Record was created');
};



/**
 * 服务器启动
 * @type {Number}
 */
var port = 4711;
app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
