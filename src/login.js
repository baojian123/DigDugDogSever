var http=require('http');
var express=require('express');
var qs=require('querystring');

var check = function(req,res){
	var body='';

	console.log(req.url);

	req.on('data',function(chunk){
		body+=chunk;
		// console.log("chunk:"+chunk);
	});

	req.on('end',function(){
		 // body=JSON.stringify(body);
		 body=JSON.parse(body);
		 // console.log(body);
		 // console.log(body.user_name);
		 var string="select * from user where user_name= '"+body.user_name+"' and user_pwd = '"+body.user_pwd+"';";
		 // console.log(string);
		 connection.query(string,function(error,results,fields){
			// if(error) throw error;

			// res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
			if(results.length){
				res.write("登陆成功");
				res.write("用户id："+results[0].user_id);
				res.write("用户名："+results[0].user_name);
				res.write("用户密码："+results[0].user_pwd);
			}else{
				res.write("登陆失败");
			}
			res.end();
		});
	});
}
