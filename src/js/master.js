(function() {
var breakpoint = window.matchMedia("(min-width: 1366px)");

function HeroCarousel() {
    var carousel = document.querySelector(".Carousel");
    var flkty = new Flickity( carousel, {
      cellAlign: "left",
      prevNextButtons: false,
      wrapAround: true,
      autoPlay: 4000
    });
}

window.addEventListener("load", function () {
  HeroCarousel();
}, false);

})();