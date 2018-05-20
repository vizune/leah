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

function Gallery() {
  baguetteBox.run('.Gallery', {
    //fullScreen: true
    animation: "fadeIn"
  });
  baguetteBox.show(index, gallery[0]);
}

window.addEventListener("load", function () {
  HeroCarousel();
  Gallery();
}, false);

})();