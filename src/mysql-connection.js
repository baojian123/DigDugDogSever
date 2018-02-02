var mysql=require('mysql');
var connection='' ;
var aa = 0;

var connect = function (database){
  connection = mysql.createConnection({
  	host: 'localhost',
  	user: 'root',
  	password: '0000',
  	database: database
  });
  connection.connect();
}

var query = function(string,params,res){
  connection.query(string,params,function(error,results,fields){
    if(error){
      console.log(error.message);
    }
    res(results);
  })
}

exports.connect = connect;
exports.query = query;
