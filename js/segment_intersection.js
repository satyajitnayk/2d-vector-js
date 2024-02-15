myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const A = { x: 200, y: 150 };
const B = { x: 150, y: 250 };
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

const ctx = myCanvas.getContext('2d');
let angle = 0;

const mouse = { x: 0, y: 0 };

document.onmousemove = (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
};

animate();

function animate() {
  const radius = 50;
  A.x = mouse.x + Math.cos(angle) * radius;
  A.y = mouse.y - Math.sin(angle) * radius;
  B.x = mouse.x - Math.cos(angle) * radius;
  B.y = mouse.y + Math.sin(angle) * radius;
  angle += 0.02;

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.moveTo(C.x, C.y);
  ctx.lineTo(D.x, D.y);
  ctx.stroke();

  drawDot(A, 'A');
  drawDot(B, 'B');
  drawDot(C, 'C');
  drawDot(D, 'D');

  const I = getIntersection(A, B, C, D);
  if (I) {
    drawDot(I, 'I');
  }

  requestAnimationFrame(animate);
}
