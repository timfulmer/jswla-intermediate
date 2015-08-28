/**
 * Created by timfulmer on 6/20/15.
 */

var mongoose=require('mongoose'),
  FooSchema=new mongoose.Schema({
      name:{type:String,required:true},
      secret:{type:String,select:false}
    },{toJSON:{transform: function (doc,ret) {delete ret.secret;}}}
  ),
  Foo=mongoose.model('Foo',FooSchema),
  BarSchema=new mongoose.Schema({
    name:String,
    foo:{type:mongoose.Schema.Types.ObjectId,ref:'Foo'}
  }),
  Bar=mongoose.model('Bar',BarSchema);
function setupFoo(){
  var foo=new Foo({name:'Test Foo'});
  foo.save(function(err,foo){
    if(err) return console.log(err);
    Foo.findOne({_id:foo._id})
      .exec(function(err,foo){
        if(err) return console.log(err);
        if(!foo) console.log(
          'Mongoose returns undefined when findOne returns nothing.');
        console.log('Got foo from database, %s.',JSON.stringify(foo,null,2));
        process.exit(0);
      });
  });
}
function testConstraints(){
  var foo=new Foo({});
  foo.save(function(err){
    console.log(err);
    process.exit(1);
  });
}
function testSecret(){
  var foo=new Foo({name:'Test Foo',secret:'123456'});
  foo.save(function(err,foo){
    if(err) return console.log(err);
    console.log('Saved foo to database, %s.',JSON.stringify(foo,null,2));
    Foo.findOne({_id:foo._id})
      .exec(function(err,foo){
        if(err) return console.log(err);
        if(!foo) console.log(
          'Mongoose returns undefined when findOne returns nothing.');
        console.log('Got foo from database, %s.',JSON.stringify(foo,null,2));
        process.exit(0);
      });
  })
}
function testAssociations(){
  var foo=new Foo({name:'Test Foo'});
  foo.save(function(err,foo){
    if(err) return console.log(err);
    var bar=new Bar({name:'Test Bar',foo:foo});
    bar.save(function(err,bar){
      if(err) return console.log(err);
      Bar.findOne({_id:bar._id},function(err,bar){
        console.log(
          'Got bar from database %s.',JSON.stringify(bar,null,2));
        bar.populate('foo',function(err,bar){
          if(err) return console.log(err);
          console.log(
            'Populated foo on bar %s.',JSON.stringify(bar,null,2));
          process.exit(0);
        });
      });
    });
  });
}
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  testAssociations();
});