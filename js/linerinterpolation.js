interpCanvas.width = window.innerWidth;
interpCanvas.height = window.innerHeight;

const A = { x: 100, y: 200 };
const B = { x: 400, y: 200 };

const n = 10;
for (let i = 0; i < n; ++i) {
  const t = i / (n - 1);
  const C = {
    x: lerp(A.x, B.x, t),
    y: 200,
  };
  drawDot(C, '.' + i);
}

drawDot(A, 'A');
drawDot(B, 'B');

// liner interpolation of number
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function drawDot(p, label) {
  const ctx = interpCanvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 14px Arial';
  ctx.fillText(label, p.x, p.y);
}
