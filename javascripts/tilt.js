var tilt = function(){

  var allCards = document.querySelectorAll(".vision__card");
  var config = {
    'throttle':     100,    // how much to throttle the orientation event (in millisecond intervals), to stop it choking CPU
    'betaCoef':     0.1,    // the fraction of angle to move front-back - ie 0.5 = for every 10deg of actual movement, the panels move 5deg
    'betaMax':      10, 
    'gammaCoef':    0.05,    // the fraction of angle to move left-right - ie 0.5 = for every 10deg of actual movement, the panels move 5deg
    'gammaMax':     5,
    'DelayReset':   200     // the delay in milliseconds before we reset the datum
  }
  var tiltObj = {
    'beta':         null,
    'betaZero':     0,
    'betaAdjusted': null,
    'betaLast':     null,
    'betaLastTime': null,

    'gamma':         null,
    'gammaZero':     0,
    'gammaAdjusted': null,
    'gammaLast':     null,
    'gammaLastTime': null
  };
  var styleRotateBeta;
  var styleRotateGamma;

  var init = function(){
    if (!window.DeviceOrientationEvent) {
      return;
    }
    tiltEvent();
  };

  var throttle = function (fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;
      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  };

  var tiltEvent = function (eventData) {
    window.addEventListener('deviceorientation', throttle( function(eventData) {

      // BETA: front-to-back
      tiltObj.beta = Math.round( eventData.beta );
      tiltObj.betaAdjusted = tiltObj.beta - tiltObj.betaZero;
      tiltObj.betaAdjusted = ( Math.abs(tiltObj.betaAdjusted) < 3 ? 0.001 : tiltObj.betaAdjusted );
      // GAMMA: left-to-right
      tiltObj.gamma = Math.round( eventData.gamma );
      tiltObj.gammaAdjusted = tiltObj.gamma - tiltObj.gammaZero;
      tiltObj.gammaAdjusted = ( Math.abs(tiltObj.gammaAdjusted) < 3 ? 0.001 : tiltObj.gammaAdjusted );

      if ( tiltObj.betaAdjusted != tiltObj.betaLast ) {
        tiltObj.betaLastTime = +new Date;
        tiltHandler();
      } else {
        tiltReset();
      }
      tiltObj.betaLast = tiltObj.betaAdjusted;
      tiltObj.gammaLast = tiltObj.gammaAdjusted;
    }, config.throttle ), false);
  };

  var tiltHandler = function() {

    styleRotateBeta = tiltObj.betaAdjusted * -config.betaCoef;
    styleRotateBeta = ( Math.abs(styleRotateBeta) < 2 ? 0 : styleRotateBeta );
    styleRotateGamma = tiltObj.gammaAdjusted * -config.gammaCoef;
    styleRotateGamma = ( Math.abs(styleRotateGamma) < 2 ? 0 : styleRotateGamma );

    [].forEach.call( allCards, function( card ) {
      card.style.webkitTransform = "rotate(" + styleRotateGamma + "deg) rotate3d(1,0,0, " + styleRotateBeta + "deg)";
    });
  };

  var tiltReset = function() {
    currentTime = +new Date;
    if ( ( currentTime - tiltObj.betaLastTime ) > config.DelayReset ) {
      if ( tiltObj.betaZero != tiltObj.betaLast ) {
        tiltObj.betaZero = tiltObj.beta;
      }
      if ( tiltObj.gammaZero != tiltObj.gammaLast ) {
        tiltObj.gammaZero = tiltObj.gamma;
      }
    }
  };

  return {
    init: init
  };
}();
tilt.init();