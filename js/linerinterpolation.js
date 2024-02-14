interpCanvas.width = window.innerWidth;
interpCanvas.height = window.innerHeight;

const ctx = interpCanvas.getContext('2d');

const A = { x: 100, y: 300 };
const B = { x: 400, y: 100 };

const orange = { r: 230, g: 150, b: 0 };
const blue = { r: 0, g: 70, b: 160 };

animate();

function animate() {
  ctx.clearRect(0, 0, interpCanvas.width, interpCanvas.height);

  const sec = new Date().getTime() / 1000;
  console.log(sec);
  // smoothing function
  const t = (Math.sin(sec * Math.PI) + 1) / 2;
  const C = vLerp(A, B, t);
  drawDot(C, '');

  drawDot(A, 'A');
  drawDot(B, 'B');

  // change background color
  const { r, g, b } = vLerp(orange, blue, t);
  interpCanvas.style.backgroundColor = `rgb(${r},${g},${b})`;

  requestAnimationFrame(animate);
}

function vLerp(A, B, t) {
  const result = {};
  for (let attr in A) {
    result[attr] = lerp(A[attr], B[attr], t);
  }
  return result;
}

// liner interpolation of number
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function drawDot(p, label) {
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
