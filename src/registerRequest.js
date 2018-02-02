var http = require('http');

var data = {
  user_name: 'aaa',
  user_pwd: '12345'
}

var option = {
  hostname: 'localhost',
  port: 3000,
  path: '/register',
  method: 'POST',
  json: true,
  rejectUnauthorized: true,
  headers: {
    'Accept': 'application/json;version=2.0',
    'Content-Type': 'application/json'
  }
}

var json =JSON.stringify(data);

var req=http.request(option,function(res){
  res.setEncoding('utf-8');
  res.on('data',function(data){
    console.log(data);
  })
})

req.on('error',function(e){
  console.log(e.message);
})
console.log(json);
req.write(json);

req.end();
