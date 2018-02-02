var http=require('http');

var data = {
  user_name: 'aaa',
  user_pwd: '123'
};

var option = {
  hostname: 'localhost',
  port: 3000,
  path: '/login',
  method: 'POST',
  json: true,
  rejectUnauthorized: true,
  headers: {
    'Accept': 'application/json;version=2.0',
        'Content-Type': 'application/json'             //此地方和json很有关联，需要注意
  }
}

var json = JSON.stringify(data);

var req=http.request(option,function(res){
  res.setEncoding('utf-8');
  res.on('data',function(data){
    console.log(data);
  })
});

req.on('error',function(e){
  console.log(e.message);
})

req.write(json);

req.end();
