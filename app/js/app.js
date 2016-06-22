
$.ready(function(){

  var p = AjaxWrapper.request({
    url: 'http://spa-badge-api.herokuapp.com/teachers',
    type: 'get'})
  .then(function(data){
    console.log(data);

  // Grab the template script
  var theTemplateScript = $("#teachers-template").innerHTML;

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var parsed = JSON.parse(data);
  var arr = [];
    for (var x in parsed){
      arr.push(parsed[x])
    }
  var context = {
    arr: arr
  }
  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);
  // Add the compiled html to the page
  $('.content-placeholder')[0].innerHTML=theCompiledHtml

}).catch(function(){
  console.log("error");
})
});
