/**
 * Created by timfulmer on 8/26/15.
 */
function outerScope(){
  var outerVariable='outerVariable';
  return function innerScope(){
    console.log(outerVariable);
  }
}
var closure=outerScope();
closure();
process.exit(0);