/**
 * Created by timfulmer on 8/26/15.
 */
var threeFunctionsModule=(function(){
  function one(){
    return console.log('one');
  }
  function two(){
    return console.log('two');
  }
  function three(){
    return console.log('three');
  }
  function threeFunctions(){
    one();
    two();
    three();
  }
  return {threeFunctions:threeFunctions};
})();
threeFunctionsModule.threeFunctions();
process.exit(0);