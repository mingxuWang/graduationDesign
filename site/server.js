var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

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
    if (user == '111' && pwd == '222') {
        var response = {
            ret: 0,
            name: 'xiaoming',
            age: 20
        }
        res.send(response);
    } else {
        console.log('测试失败');
    }
})

var port = 4711;
app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
