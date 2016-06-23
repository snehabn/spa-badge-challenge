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
    console.log(context.arr);
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.content-placeholder')[0].innerHTML=theCompiledHtml
    $('a').on('click', function(event){
      console.log("click works")
      event.preventDefault();
      link = this.href
      var x = AjaxWrapper.request({
        url: link,
        type: 'get'
      }).then(function(data){
        console.log(data);
        var theTemplateScript = $("#teachers-template").innerHTML;
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
    var parsed = JSON.parse(data);
    var arr = [];
    for (var x in parsed){
      arr.push(parsed[x])
    }
    var context = {
      arr: arr[2]
    }
      // Pass our data to the template
      var theCompiledHtml = theTemplate(context);
      // Add the compiled html to the page
      $('.teach-info')[0].innerHTML=theCompiledHtml
      console.log(context.arr);
    }).catch(function(){
      console.log("error");
    })
  });
//end outer ajax success
}).catch(function(){
  console.log("error");
})
});
