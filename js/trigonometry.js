const ctx = myCanvas.getContext('2d');

const offset = {
  x: myCanvas.width / 2,
  y: myCanvas.height / 2,
};

// move 0,0 to middle of canvas
ctx.translate(offset.x, offset.y);

const A = { x: 0, y: 0 };
const B = { x: 90, y: 120 };
const C = { x: B.x, y: 0 };

drawCoordinateSystem(ctx, offset);

drawPoint(A);
drawText('A', A);
drawPoint(B);
drawText('B', B);
drawPoint(C);
drawText('C', C);

function drawText(text, loc, color = 'white') {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseLine = 'middle';
  ctx.font = 'bold 13px Courier';
  ctx.fillText(text, loc.x, loc.y);
}

function drawPoint(loc, size = 20, color = 'black') {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(loc.x, loc.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawCoordinateSystem(ctx, offset) {
  ctx.beginPath();
  ctx.moveTo(-offset.x, 0);
  // horizontal line
  ctx.lineTo(ctx.canvas.width - offset.x, 0);
  ctx.moveTo(0, -offset.y);
  ctx.lineTo(0, ctx.canvas.height - offset.y);
  ctx.setLineDash([4, 2]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'grey';
  ctx.stroke();
  ctx.setLineDash([]);
}
