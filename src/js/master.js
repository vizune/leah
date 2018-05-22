(function() {

  function getOffset(el) {
    let offset = el.offsetTop;
    while ( el != document.body ) {
      el = el.parentNode;
      if ( getComputedStyle(el).position == "static" ) continue;
      offset += el.offsetTop;
    }
    return offset;
  };

  function scrollTo(t, offset, autoplay = true) {
    if ( !t ) return;
    const body = (document.scrollingElement||document.body);
    const position = body.scrollTop;
    const o = getOffset(t) + (offset||0);
    let pos = {scrollTop: position};
    const tween = anime({
      targets: pos,
      scrollTop: o,
      duration: 800,
      easing: 'easeOutQuad',
      autoplay: false,
      update: () => {
        body.scrollTop = pos.scrollTop
      }
    })
    return autoplay ? tween.play() : tween;
  };

  const breakpoint = window.matchMedia("(min-width: 1366px)");

  function HeroCarousel() {
      const carousel = document.querySelector(".Carousel");
      const flkty = new Flickity( carousel, {
        cellAlign: "left",
        prevNextButtons: false,
        wrapAround: true,
        pageDots: false,
        autoPlay: 3500
      });
  }

  function Gallery() {
    baguetteBox.run('.Gallery', {
      animation: "fadeIn"
    });
  }

  function Scroll() {
    const arrow = document.querySelector(".Arrow");
    const banner = document.querySelector(".Banner");
    const content = document.querySelector("#Content");

    arrow.addEventListener("click", function() {
      //scrollTo(this.target, -this.offset);
      scrollTo(content);
    });
  }

  window.addEventListener("load", function () {
    HeroCarousel();
    Gallery();
    Scroll();
  }, false);

})();