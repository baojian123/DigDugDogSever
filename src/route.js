var express = require('express');
var app = express();
// var login = require('./login');
var mysql = require('./mysql-connection');
var bodyParser=require('body-parser');

var constant=require('./constant');
console.log(typeof(constant.day))
var cookieConfigure={maxAge:30*constant.day,path:'/',httpOnly:true};



app.use(bodyParser.json());

mysql.connect('DigDugDog');

app.get('/',function(req,res){
	// res.send('Hello World!');
	// next();
});

app.use('/login',function(req,res){
	res.setHeader( "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");//
	res.setHeader( "Access-Control-Allow-Origin", "*" ); //可以访问此域资源的域。*为所有
	// res.setHeader("Access-Control-Allow-Credentials","true");
	// res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader( "Access-Control-Allow-Methods", "*" ); //可以访问此域的脚本方法类型
	res.setHeader( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");


	var sqlString='select * from user where user_name = ?;';

	// req.body=JSON.parse(req.body);
	console.log(req.body);
	var user_name=req.body.user_name;
	var user_pwd=req.body.user_pwd;
	mysql.query(sqlString,[user_name,user_pwd],function(results){
		if(results.length){
			if(user_pwd==results[0].user_pwd){
				res.cookie('user','user_name='+user_name,cookieConfigure);
				console.log("登陆成功");
				res.write("登陆成功");
			}else{
				console.log("密码错误");
				res.write("密码错误");
			}
		}else{
			console.log("找不到用户名");
			res.write("找不到用户名");
		}
		res.send();
	});
});

app.use('/register',function(req,res){
	res.setHeader( "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");//
	res.setHeader( "Access-Control-Allow-Origin", "*" ); //可以访问此域资源的域。*为所有
	res.setHeader( "Access-Control-Allow-Methods", "POST" ); //可以访问此域的脚本方法类型
	res.setHeader( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");


	var sqlString='select * from user where user_name = ? ;';
	var user_id=0;
	var user_name=req.body.user_name;
	var user_pwd=req.body.user_pwd;
	mysql.query(sqlString,[user_name],function(results){
		if(results.length){
			console.log("用户名已存在");
			res.write("用户名已存在");
		}else{
			res.cookie('user','user_name='+user_name,cookieConfigure);
			console.log("注册成功");
			res.write("注册成功");
			sqlString='select count(user_id) as count from user;'
			mysql.query(sqlString,[],function(results){
				console.log(results[0].count);
				user_id=results[0].count+constant.user_bound+1;
				sqlString='insert into user(user_id,user_name,user_pwd) values(?,?,?);'
				mysql.query(sqlString,[user_id,user_name,user_pwd],function(results){
					console.log('插入成功:'+results);
				});
			});
		}
		res.send();
	})
});

var sever =app.listen(3000, function(){
	var host = sever.address().address;
	var port = sever.address().port;

	console.log('Example app listening at http://%s:%s',host,port);
});
