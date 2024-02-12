const ctx = myCanvas.getContext('2d');

const offset = {
  x: myCanvas.width / 2,
  y: myCanvas.height / 2,
};

const point = { x: 90, y: 120 };

ctx.translate(offset.x, offset.y);

update();
document.onmousemove = (event) => {
  point.x = event.x - offset.x;
  point.y = event.y - offset.y;

  update();
};

function update() {
  ctx.clearRect(-offset.x, -offset.y, myCanvas.width, myCanvas.height);

  drawCoordinateSystem();

  drawPoint(point);

  console.log(magnitude(point));
}

function magnitude({ x, y }) {
  return Math.hypot(x, y);
}

function drawPoint(loc, size = 10, color = 'white') {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(loc.x, loc.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawCoordinateSystem() {
  ctx.beginPath();
  ctx.moveTo(-offset.x, 0);
  ctx.lineTo(myCanvas.width - offset.x, 0);
  ctx.moveTo(0, -offset.y);
  ctx.lineTo(0, myCanvas.height - offset.y);
  ctx.setLineDash([5, 4]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.setLineDash([]);
}
