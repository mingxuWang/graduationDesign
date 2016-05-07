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

app.get('/index/list', function(req, res) {
    var testArr = [{
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'static/imgs/1.jpeg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'static/imgs/2.jpeg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'static/imgs/3.jpeg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'static/imgs/4.jpeg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'static/imgs/5.jpeg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'static/imgs/6.jpeg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'static/imgs/example.jpg'
    }];
    res.send(testArr);
});

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
})

app.post('/account/login', function(req, res) {
    var user = req.body.username;
    var pwd = req.body.password;
    var user = {
        username: req.body.username,
        password: req.body.password
    };
    Account.findOne({ username: user.username, password: user.password }, function(err, doc) {
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

    var user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        gender: req.body.gender,
        birth_year: req.body.birth_year,
        phone: req.body.phone,
        hobbies: req.body.hobbies,
        disease: req.body.disease
    };
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
    Account = db.model('Account', AccountSchema);
});

var register = function(userInfo) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(userInfo.password);
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


var port = 4711;
app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
