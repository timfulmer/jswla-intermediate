/**
 * Created by timfulmer on 8/27/15.
 */
var http=require('http');
function handleRequest(req,res){
  res.end('Hello World!');
}
var server = http.createServer(handleRequest);
server.listen(3000, function(){
  console.log("Server listening on: http://localhost:3000");
});

//var express=require('express'),
//  app=express();
//app.get('/',function(req,res) {
//  res.send('Hello World!');
//});
//var server=app.listen(3000,function(){
//  var host=server.address().address,
//    port=server.address().port;
//  console.log('Server listening on: http://%s:%s', host, port);
//});

//var restify=require('restify');
//function respond(req,res,next) {
//  res.send('hello '+req.params.name);
//  next();
//}
//var server = restify.createServer();
//server.get('/hello/:name', respond);
//server.head('/hello/:name', respond);
//server.listen(3000, function() {
//  console.log('%s listening at %s', server.name, server.url);
//});