var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    crypto = require('crypto');
var AccountSchema, Account;

var app = express();

app.configure(function() {
    app.use(express.bodyParser());

    app.use(express.methodOverride());

    app.use(express.static(path.join(application_root, 'site')));

    app.use(express.errorHandler({ dumpException: true, showStack: true }));
});

// 前端接口
app.get('/chatting/list', function(req, res) {
    var testArr = [{
        id: '123',
        title: '音乐享乐派',
        date: '5月3日',
        area: '北京市丰台区',
        intro: '我们来聊聊音乐吧!',
        src: 'static/imgs/4.jpeg'
    }, {
        id: '123',
        title: '翻过高山',
        date: '5月6日',
        area: '北京市朝阳区',
        intro: '周末去爬山吗!',
        src: 'static/imgs/2.jpeg'
    }, {
        id: '123',
        title: '舞出人生',
        date: '5月3日',
        area: '北京市西城区',
        intro: '今儿晚上广场舞约吗!',
        src: 'static/imgs/3.jpeg'
    }, {
        id: '123',
        title: '钓鱼岛',
        date: '5月3日',
        area: '北京市海淀区',
        intro: '听说颐和园后面有个野湖!',
        src: 'static/imgs/6.jpeg'
    }];
    res.send(testArr);
});
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

app.get('/userInfo',function(req,res){
    Account.find({},{password:0},function(err,doc){
        if(doc != []){
            var resp = {
                ret :1,
                info : doc
            }
            res.send(resp);
        }else{
            var resp = {
                ret :0,
                msg :'暂无数据！'
            }
        }
    });
});

// 文章相关接口
app.post('/publish',function(req,res){
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
            publish(art);
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
                list : doc
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
})


// 数据库连接相关
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
        collections:{type:[]},
        tips:{type:[]}
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
    Account = db.model('Account', AccountSchema);
    AdminAccount = db.model('AdminAccount',AdminAccountSchema);
    Artical = db.model('Artical',ArticalSchema);
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

var publish = function(artical){
    var art = new Artical({
        title: artical.title,
        date: artical.date,
        author:artical.author,
        summary: artical.summary,
        artical:artical.artical,
        img_src:artical.img_src
    })
    art.save(publishCallback);
};
var publishCallback = function(err) {
    if (err) {
        return console.log(err);
    }
    return console.log('Artical was created');
};


var port = 4711;
app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
