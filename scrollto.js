function getOffset(el) {
  let offset = el.offsetTop;
  while ( el != document.body ) {
    el = el.parentNode;
    if ( getComputedStyle(el).position == "static" ) continue;
    offset += el.offsetTop;
  }
  return offset;
}

function scrollTo(t, offset, autoplay = true) {
  if ( !t ) return;
  const body = (document.scrollingElement||document.body);
  const position = body.scrollTop;
  const o = getOffset(t) + (offset||0);
  // const diff = o - position;
  let pos = {scrollTop: position};
  const tween = anime({
    targets: pos,
    scrollTop: o,
    duration: 200,
    easing: 'easeInCubic',
    autoplay: false,
    update: () => {
      body.scrollTop = pos.scrollTop
    }
  })
  return autoplay ? tween.play() : tween;
}
