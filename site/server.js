var application_root = __dirname,
	express = require('express'),
	path = require('path'),
	mongoose = require('mongoose');

var app = express();

app.configure(function(){
	app.use(express.bodyParser());

	app.use(express.methodOverride());

	app.use(express.static(path.join(application_root,'site')));

	app.use(express.errorHandler({dumpException:true,showStack:true}));
});

app.get('/list',function(req,res){
	var testArr = [{
	    id: '123',
	    title: '我是一个测试数据',
	    date: '5月3日',
	    summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
	    src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
	}, {
	    id: '123',
	    title: '我是一个测试数据',
	    date: '5月3日',
	    summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
	    src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
	}, {
	    id: '123',
	    title: '我是一个测试数据',
	    date: '5月3日',
	    summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
	    src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
	}, {
	    id: '123',
	    title: '我是一个测试数据',
	    date: '5月3日',
	    summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
	    src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
	}, {
	    id: '123',
	    title: '我是一个测试数据',
	    date: '5月3日',
	    summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
	    src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
	}, {
	    id: '123',
	    title: '我是一个测试数据',
	    date: '5月3日',
	    summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
	    src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
	}, {
	    id: '123',
	    title: '我是一个测试数据',
	    date: '5月3日',
	    summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
	    src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
	}]
	res.send(testArr);
})

var port = 4711;
app.listen(port,function(){
	console.log("Express server listening on port %d in %s mode",port,app.settings.env);
});