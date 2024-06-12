console.clear();

const c = document.querySelector('canvas');
const ctx = c.getContext('2d');
let cw, ch; // Initialize canvas width and height variables

function setCanvasSize() {
  cw = c.width = innerWidth;
  ch = c.height = innerHeight;
}

// Set initial canvas size
setCanvasSize();

const bubbles = [];
const debounce = gsap.to(window, { duration: 0.5, paused: true }); // Control the rate at which new bubbles can be made
const img = new Image();
const m = { x: 0, y: 0 };

img.src = 'https://assets.codepen.io/721952/bubbles.webp';
img.onload = () => {
  for (let i = 0; i < 20; i++) { // Make a few bubbles to start
    m.x = gsap.utils.random(150, cw - 150, 1);
    m.y = gsap.utils.random(150, ch - 150, 1);
    makeBubble(true);
  }
};

window.onpointermove = (e) => { // Bubbles are made on pointer move/tap
  m.x = e.clientX;
  m.y = e.clientY;
  makeBubble();
};

function makeBubble(auto) {
  if (debounce.progress() === 1 || auto) {
    debounce.restart();

    const dist = gsap.utils.random(100, 200);
    const scale = gsap.utils.random(0.6, 0.8);
    const b = {
      dur: gsap.utils.random(3, 7),
      spriteDur: gsap.utils.random(0.12, 0.5),
      rotate: gsap.utils.random(-9, 9),
      scaleX: scale,
      scaleY: scale,
      step: 0,
      x: m.x,
      y: m.y,
    };

    bubbles.push(b);

    gsap.timeline({ defaults: { ease: 'none' } })
      .fromTo(
        b,
        {
          x: m.x - 75 * scale,
          y: m.y - 75 * scale,
        },
        {
          duration: b.dur,
          rotate: `+=${gsap.utils.random(-5, 5, 1)}`,
          motionPath: () =>
            'M' +
            b.x +
            ',' +
            b.y +
            'c' +
            gsap.utils.random(-dist, dist, 1) +
            ',' +
            gsap.utils.random(-dist, dist, 1) +
            ' ' +
            gsap.utils.random(-dist, dist, 1) +
            ',' +
            gsap.utils.random(-dist, dist, 1) +
            ' ' +
            gsap.utils.random(-dist, dist, 1) +
            ',' +
            gsap.utils.random(-dist, dist, 1),
        },
        0
      )
      .to(
        b,
        {
          duration: b.dur / 5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 3,
          repeatRefresh: true,
          scaleX: () => 0.7 + Math.random() / 9,
          scaleY: () => 0.7 + Math.random() / 9,
        },
        b.dur / 5
      )
      .to(
        b,
        {
          duration: b.spriteDur,
          step: 8,
          snap: 'step',
        },
        b.dur - b.spriteDur
      );
  }
}

gsap.ticker.add(() => {
  ctx.clearRect(0, 0, cw, ch);
  bubbles.forEach((b) => {
    ctx.save();
    ctx.translate(b.x + b.scaleX * 75, b.y + b.scaleY * 75);
    ctx.rotate((b.rotate * Math.PI) / 180);
    ctx.drawImage(
      img,
      0,
      b.step * 150,
      150,
      150,
      -b.scaleX * 75,
      -b.scaleY * 75,
      b.scaleX * 150,
      b.scaleY * 150
    );
    ctx.restore();
  });
});

window.onresize = setCanvasSize;
