var touch = function(){

  var init = function() {
    lockScroll();
  }

  var lockScroll = function() {
    document.addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault();
      },
      false
    );
  }

  return {
    init: init
  };
}();
touch.init();