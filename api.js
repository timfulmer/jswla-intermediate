var express=require('express'),
  mongoose=require('mongoose'),
  bodyParser=require('body-parser'),
  app=express(),
  WidgetSchema=new mongoose.Schema({
      name:{type:String,required:true},
      status:{type:Boolean}
    }
  ),
  Widget=mongoose.model('Widget',WidgetSchema);

app.use(bodyParser.json());

app.get('/api/widget',function(req,res) {
  console.log('get widgets');
  Widget
    .find({})
    .exec(function(err,widgets){
      if(err){
        console.log(err);
        return res.sendStatus(422);
      }
      res.send(JSON.stringify(widgets,null,2));
    });
});
app.get('/api/widget/:id',function(req,res) {
  console.log('get widget by id');
  Widget
    .findOne({_id:req.params.id})
    .exec(function(err,widget){
      if(err){
        console.log(err);
        return res.sendStatus(422);
      }
      res.send(JSON.stringify(widget,null,2));
    });
});
app.post('/api/widget',function(req,res) {
  console.log('post new widget');
  var widget=new Widget(req.body);
  console.log(JSON.stringify(widget,null,2));
  widget.save(function(err,widget){
    if(err){
      console.log(err);
      return res.sendStatus(422);
    }
    console.log(JSON.stringify(widget,null,2));
    console.log('Sending status');
    return res.send(JSON.stringify(widget));
  });
});
app.put('/api/widget/:id',function(req,res) {
  console.log('edit widget');
  Widget
    .findOne({_id:req.params.id})
    .exec(function(err,widget){
      if(err){
        console.log(err);
        return res.sendStatus(422);
      }
      if(req.body.name){
        widget.name=req.body.name;
      }
      widget.save(function(err,widget){
        if(err){
          console.log(err);
          return res.sendStatus(422);
        }
        res.send(JSON.stringify(widget,null,2));
      });
    });
});
app.delete('/api/widget/:id',function(req,res) {
  console.log('delete widget');
  Widget
    .remove({_id:req.params.id})
    .exec(function(err,widget){
      if(err){
        console.log(err);
        return res.sendStatus(422);
      }
      res.send(JSON.stringify(widget,null,2));
    });
});

mongoose.connect('mongodb://jswla:jswla@ds035573.mongolab.com:35573/jswla');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var server=app.listen(3000,function(){
    var host=server.address().address,
      port=server.address().port;
    console.log('Server listening on: http://%s:%s', host, port);
  });
});
