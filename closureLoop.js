/**
 * Created by timfulmer on 8/26/15.
 */
var colors=[{name:'red'},{name:'blue'},{name:'green'}];
for(var i=0;i<colors.length;i++){
  var color=colors[i];
  color.countCharacters=function(){
    return color.name.length;
  };
}
//colors.forEach(function(color){
//  color.countCharacters=function(){
//    return color.name.length;
//  }
//});
console.log(colors[0].countCharacters());
process.exit(0);