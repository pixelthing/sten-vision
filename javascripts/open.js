var open = function(){

  var init = function() {
    clickEvent();
  }

  var clickEvent = function() {
    var container = document.querySelector(".vision");
    var allCards = document.querySelectorAll(".vision__card");
    var title;
    var titleDims;
    var titleSizePx;
    var titleSizeEm;
    [].forEach.call( allCards, function( card ) {
      card.addEventListener('click', function(ev) {
        title = card.querySelector(".vision__card__title");
        if (container.classList.contains('vision--open')) {
          title.setAttribute('style','');
          this.classList.remove('vision__card--open');
          container.classList.remove('vision--open');
        } else {
          this.classList.add('vision__card--open');
          container.classList.add('vision--open');
        }
      });
    });
  }

  return {
    init: init
  };
}();
open.init();