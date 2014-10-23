var touch = function(){

  var cardWidth;
  var styleRotateGamma;

  var init = function() {
    lockScroll();
    cardPanInit();
    cardWidth = document.querySelector('.vision__card--0').offsetWidth;
  }

  var TempNoTouchMove = function(ev) {
    ev.preventDefault();
  }

  var lockScroll = function() {
    document.querySelector('body').addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault();
      },
      false
    );
  }

  var cardPanInit = function() {
    var el = document.querySelector('.vision__card--0');
    var hammertime = new Hammer(el);
    hammertime.get('pan').set({ threshold: 20, direction: Hammer.DIRECTION_HORIZONTAL });
    hammertime.on('pan', function(ev) {
      cardPanTurn(hammertime,el,ev);
    });
  }

  var cardPanTurn = function(hammertime,el,ev) {
    styleRotateGamma = ( ev.deltaX / cardWidth ) * 270
    if ( styleRotateGamma > 90 ) {
      hammertime.get('pan').set({ enable: false });
      cardPanFlip(hammertime,el,'left');
    } else if ( styleRotateGamma < -90 ) {
      hammertime.get('pan').set({ enable: false });
      cardPanFlip(hammertime,el,'right');
    } else if (ev.isFinal) {
      el.setAttribute('style', '');
    } else {
      el.style.webkitTransition = "all 0";
      el.style.webkitTransform = "rotateY(" + styleRotateGamma + "deg)";
    }
  }

  var cardPanFlip = function(hammertime,el,dir) {
    el.setAttribute('style', '');
    el.classList.toggle('vision__card--flipped');
    console.log(el.classList.contains('vision__card--flipped'))
    setTimeout(function(){
      hammertime.get('pan').set({ enable: true });
    },500);
  }

  return {
    init: init
  };
}();
touch.init();