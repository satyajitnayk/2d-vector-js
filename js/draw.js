const ctx = myCanvas.getContext('2d');

function clear() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawArrow(tip, tail = { x: 0, y: 0 }, color = 'white', size = 20) {
  ctx.save();
  const { dir, mag } = toPolar(subtract(tip, tail));
  const v1 = { dir: dir + Math.PI * 0.8, mag: size / 2 };
  const p1 = toXY(v1);
  const t1 = add(p1, tip);
  const v2 = { dir: dir - Math.PI * 0.8, mag: size / 2 };
  const p2 = toXY(v2);
  const t2 = add(p2, tip);
  ctx.beginPath();
  ctx.moveTo(tail.x, tail.y);
  ctx.lineTo(tip.x, tip.y);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tip.x, tip.y);
  ctx.lineTo(t1.x, t1.y);
  ctx.lineTo(t2.x, t2.y);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
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

function drawSegment(A, B) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 2;
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.stroke();
  ctx.restore();
}

function drawText(text, { x = 10, y = 10 } = {}) {
  ctx.save();
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(text, x, y);
  ctx.restore();
}
