var setup = function(){

  var init = function(){
    roughTouchCheck();
  };

  var roughTouchCheck = function(){
    if (!('ontouchstart' in document.documentElement)) {
      document.querySelector("html").classList.add('no-touch');
    }
  };

  return {
    init: init
  };
}();
setup.init();