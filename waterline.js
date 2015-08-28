/**
 * Created by timfulmer on 6/20/15.
 */

var Waterline=require('waterline'),orm=new Waterline(),
  mongoAdapter=require('sails-mongo'),
  config={
    adapters:{default:mongoAdapter,mongo:mongoAdapter},
    connections:{
      localhostMongo:{
        adapter: 'mongo',host: 'localhost',port: 27017,database: 'test'
      }
    }
  };
orm.loadCollection(Waterline.Collection.extend({
  identity: 'foo',
  connection: 'localhostMongo',
  attributes: {
    name:{type:'string',required:true},
    secret:{type:'string'},
    toJSON: function() {
      var foo= this.toObject();
      delete foo.secret;
      return foo;
    }
  }
}));
orm.loadCollection(Waterline.Collection.extend({
  identity: 'bar',
  connection: 'localhostMongo',
  attributes: {
    name:{type:'string',required:true},
    foo:{model:'foo'}
  }
}));
function setupFoo(Foo){
  Foo.create({name:'Test Foo'}).then(function(foo){
      Foo.findOne().where({id:foo._id}).then(function(foo){
          if(!foo) console.log(
            'Waterline returns undefined when findOne returns nothing.');
          console.log('Got foo from database, %s.',JSON.stringify(foo,null,2));
          process.exit(0);
        });
    });
}
function testConstraints(Foo){
  Foo.create({}).catch(function(err){
    console.log(err);
    process.exit(1);
  });
}
function testSecret(Foo){
  Foo.create({name:'Test Foo',secret:123456}).then(function(foo){
    console.log('Saved foo to database, %s.',
      JSON.stringify(foo,null,2));
    process.exit(0);
  })
}
function testAssociations(Foo,Bar){
  Foo.create({name:'Test Foo'}).then(function(foo){
    Bar.create({name:'Test Bar',foo:foo}).then(function(bar){
      console.log('Saved bar to database %s.',JSON.stringify(bar,0,2));
      Bar.findOne({id:bar.id}).populate('foo').then(function(bar){
        console.log('Populated foo on bar %s.',JSON.stringify(bar,0,2));
        process.exit(0);
      });
    });
  });
}
orm.initialize(config,function(err,models){
  if(err) return console.log(err);
  testAssociations(models.collections.foo,models.collections.bar);
});