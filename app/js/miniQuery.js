// /*!
//  * minQuery
//  */
// A selector library
var SweetSelector = {
  select: function(selector){
    if (selector.includes("#")){
      return document.getElementById(selector.substring(1));
    } else if (selector.includes(".")){
      return document.getElementsByClassName(selector.substring(1));
    } else {
      return document.getElementsByTagName(selector);
    }
  }
};

// DOM manipulation
var DOM = {

  hide: function(selector) {
    var collection = SweetSelector.select(selector)
    if (selector[0] === "." ) {
      for (var i =0; i < collection.length; i++){
        SweetSelector.select(selector)[i].style.display = "none";
      }
    } else if (selector[0] === "#") {
      SweetSelector.select(selector).style.display = "none";
    } else {
      for (var i =0; i < collection.length; i++){
        SweetSelector.select(selector)[i].style.display = "none";
      }
    }
  },

  show: function(selector) {
    var collection = SweetSelector.select(selector)
    if (selector[0] === "." ) {
      for (var i =0; i < collection.length; i++){
        SweetSelector.select(selector)[i].style.display = "";
      }
    } else if (selector[0] === "#") {
      SweetSelector.select(selector).style.display = "";
    } else {
      for (var i =0; i < collection.length; i++){
        SweetSelector.select(selector)[i].style.display = "";
      }
    }
  },

  addClass: function(selector, newClass) {
    var collection = SweetSelector.select(selector)
    if (selector[0] === "#" ) {
      collection.classList += (" " + newClass);
    } else {
     for (var i =0; i < collection.length; i++){
      collection[i].classList = (selector.substring(1) + " " + newClass);
    }
  }
},

removeClass: function(selector, newClass) {
  var collection = SweetSelector.select(selector)
  if (selector[0] === "#" ) {
    collection.classList.remove(newClass);
  } else {
   for (var i =0; i < collection.length; i++){
    collection[i].classList.remove(newClass);
  }
}
}
};

var EventDispatcher = {
  event: null,
  on: function (selector, eventName, callback){
   this.event = new Event(eventName);
   var el = SweetSelector.select(selector)[0];
   el.addEventListener(eventName, callback,  false);
 },
 trigger: function (selector, eventName){
  var el = SweetSelector.select(selector)[0];
  el.dispatchEvent(this.event)
}
};


var AjaxWrapper = (function(){
  var request = function(options){
    var uri = options.url
    var method = options.type
    var client = new XMLHttpRequest()

    return new Promise(function(resolve, reject) {

     client.open(method, uri);
     client.send();

     client.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        console.log("success")
        resolve(this.response);
      } else {
        console.log("error")
        reject(this.statusText);
      }
    };
    client.onerror = function () {
      reject(this.statusText);
    };
  });
  };
  return {
    request: request
  }
}());
// ruby -run -ehttpd . -p8000 --> JS and Ajax have to run locally on a HTTP server.

// var miniQuery = function(selector){


//  var domElement = SweetSelector.select(selector),

//   var hide = DOM.hide;
//   var show = DOM.show;
//   var addClass = DOM.addClass;
//   var removeClass = DOM.removeClass;

//   return {
//     // select: function() {
//     //   SweetSelector.select(selector)
//     // },
// // 1
//     domElement,
//     hide: function(){
//       DOM.hide(selector)
//     },
//     show: function(){
//       DOM.show(selector)
//     },
//     addClass: function(newClass){
//       DOM.addClass(selector, newClass)
//     },
//     removeClass: function(newClass){
//       DOM.removeClass(selector, newClass)
//     }
//   };
// };


var miniQuery = function(selector) {

  domElement = SweetSelector.select(selector);

  domElement.hide = function(){
    DOM.hide(selector)
  },
  domElement.show = function() {
   DOM.show(selector)
  },
  domElement.addClass = function(newClass){
  DOM.addClass(selector, newClass)
  },
  domElement.removeClass = function(newClass){
  DOM.removeClass(selector, newClass)
  },
  domElement.on = function(eventName, callback){
    EventDispatcher.on(selector, eventName, callback)
  },
  domElement.trigger = function(eventName){
  EventDispatcher.trigger(selector, eventName)
  },
  ajax: function(){
    AjaxWrapper.
  }


return domElement;
}


