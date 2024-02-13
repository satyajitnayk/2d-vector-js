const trigCtx = trigCanvas.getContext('2d');
const chartCtx = chartCanvas.getContext('2d');

const trigOffset = {
  x: trigCanvas.width / 2,
  y: trigCanvas.height / 2,
};

const chartOffset = {
  x: chartCanvas.width / 2,
  y: chartCanvas.height / 2,
};

const A = { x: 0, y: 0 };
const B = { x: 90, y: 120 };
const C = { x: B.x, y: 0 };

// move 0,0 to middle of canvas
trigCtx.translate(trigOffset.x, trigOffset.y);
chartCtx.translate(chartOffset.x, chartOffset.y);

drawCoordinateSystem(chartCtx, chartOffset);

function update() {
  // naming convetion AB opposite is C so name distance b/w AB as c
  const c = distance(A, B);
  const a = distance(B, C);
  const b = distance(A, C);

  const sin = a / c;
  const cos = b / c;
  const tan = a / b;
  // arcsin = sin inverse
  // asin will give 𝜃 value in radian instead of degree
  const theta = Math.asin(sin);

  trigCtx.clearRect(
    -trigOffset.x,
    -trigOffset.y,
    trigCanvas.width,
    trigCanvas.height
  );

  drawCoordinateSystem(trigCtx, trigOffset);

  drawText(
    'sin = a/c = ' + sin.toFixed(2),
    {
      x: -trigOffset.x / 2,
      y: trigOffset.y * 0.7,
    },
    'red'
  );

  drawText(
    'cos = b/c = ' + cos.toFixed(2),
    {
      x: -trigOffset.x / 2,
      y: trigOffset.y * 0.8,
    },
    'blue'
  );

  drawText(
    'tan = a/b = ' + tan.toFixed(2),
    {
      x: -trigOffset.x / 2,
      y: trigOffset.y * 0.9,
    },
    'magenta'
  );

  drawText(
    '𝜃 = ' +
      theta.toFixed(2) +
      ' (' +
      Math.round(toDegree(theta)) +
      '°)'.toString().padStart(2, ' '),
    {
      x: trigOffset.x / 2,
      y: trigOffset.y * 0.75,
    }
  );

  drawLine(A, B);
  drawText('c', average(A, B));
  drawLine(A, C, 'blue');
  drawText('b', average(A, C), 'blue');
  drawLine(B, C, 'red');
  drawText('a', average(B, C), 'red');

  drawText('𝜃', A);

  trigCtx.beginPath();
  trigCtx.strokeStyle = 'black';
  trigCtx.lineWidth = 2;
  // Determine the starting angle of the arc based on the relative position of points B and A
  const start = B.x > A.x ? 0 : Math.PI;
  // Determine whether the arc should be drawn clockwise or counterclockwise
  const clockwise = (B.y < C.y) ^ (B.x > A.x);
  // Calculate the ending angle of the arc based on the value of theta and the relative positions of points B, C, and A
  let end = B.y < C.y ? -theta : theta;
  // Adjust the ending angle if point B is to the left of point A
  if (B.x < A.x) {
    end = Math.PI - end;
  }

  trigCtx.arc(0, 0, 20, start, end, !clockwise);
  trigCtx.stroke();

  // draw the graph using sin, cosine, tangent values
  const chartScalar = chartOffset.y * 0.5;
  drawPoint(
    {
      x: theta * chartScalar,
      y: sin * chartScalar,
    },
    2,
    'red'
  );
  drawPoint(
    {
      x: theta * chartScalar,
      y: cos * chartScalar,
    },
    2,
    'blue'
  );
  drawPoint(
    {
      x: theta * chartScalar,
      y: tan * chartScalar,
    },
    2,
    'magenta'
  );
}

update();
document.onmousemove = (event) => {
  B.x = event.x - trigOffset.x;
  B.y = event.y - trigOffset.y;

  C.x = B.x;

  update();
};

// Radian to degree
function toDegree(radian) {
  return (radian * 180) / Math.PI;
}

function average(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function drawText(text, loc, color = 'black') {
  trigCtx.beginPath();
  trigCtx.fillStyle = color;
  trigCtx.textAlign = 'center';
  trigCtx.textBaseline = 'middle';
  trigCtx.font = 'bold 18px Courier';
  trigCtx.strokeStyle = 'white';
  trigCtx.lineWidth = 7;
  trigCtx.strokeText(text, loc.x, loc.y);
  trigCtx.fillText(text, loc.x, loc.y);
}

function drawPoint(loc, size = 20, color = 'black') {
  chartCtx.beginPath();
  chartCtx.fillStyle = color;
  chartCtx.arc(loc.x, loc.y, size / 2, 0, Math.PI * 2);
  chartCtx.fill();
}

function drawLine(p1, p2, color = 'black') {
  trigCtx.beginPath();
  trigCtx.strokeStyle = color;
  trigCtx.lineWidth = 2;
  trigCtx.moveTo(p1.x, p1.y);
  trigCtx.lineTo(p2.x, p2.y);
  trigCtx.stroke();
}

function drawCoordinateSystem(trigCtx, trigOffset) {
  trigCtx.beginPath();
  trigCtx.moveTo(-trigOffset.x, 0);
  // horizontal line
  trigCtx.lineTo(trigCtx.canvas.width - trigOffset.x, 0);
  trigCtx.moveTo(0, -trigOffset.y);
  trigCtx.lineTo(0, trigCtx.canvas.height - trigOffset.y);
  trigCtx.setLineDash([4, 2]);
  trigCtx.lineWidth = 1;
  trigCtx.strokeStyle = 'grey';
  trigCtx.stroke();
  trigCtx.setLineDash([]);
}
