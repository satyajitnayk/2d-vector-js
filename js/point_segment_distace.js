function drawDot(pos, label) {
  const ctx = myCanvas.getContext('2d');
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = '20px Arial';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillText(label, pos.x - 10, pos.y + 6);
  ctx.restore();
}

const A = { x: 100, y: 200 };
const B = { x: 400, y: 300 };
const M = {
  x: 250,
  y: 250,
};

// listener for moving the point M
myCanvas.addEventListener('mousemove', (evt) => {
  M.x = evt.offsetX;
  M.y = evt.offsetY;
  redrawAll();
});

// listener for moving the point A
myCanvas.addEventListener('click', (evt) => {
  A.x = evt.offsetX;
  A.y = evt.offsetY;
  redrawAll();
});

// listener for moving the point B
myCanvas.addEventListener('contextmenu', (evt) => {
  B.x = evt.offsetX;
  B.y = evt.offsetY;
  redrawAll();
  evt.preventDefault();
});

function redrawAll() {
  clear();
  drawDot(A, 'A');
  drawDot(B, 'B');
  drawDot(M, 'M');
  drawSegment(A, B);
  const result = distanceFromPointToSegment(M, A, B);
  drawText(result.value);
  drawArrow(result.point, M);
}

function distanceFromPointToSegment(M, A, B) {
  const { P, t } = projectPointToSegment(M, A, B);
  // projection is b/w line
  if (t > 0 && t < 1) {
    return { point: P, value: distance(M, P) };
  } else {
    const distToA = distance(M, A);
    const distToB = distance(M, B);
    if (distToA < distToB) {
      return { point: A, value: distToA };
    } else {
      return { point: B, value: distToB };
    }
  }
}

function projectPointToSegment(M, A, B) {
  const AB = subtract(B, A);
  const AM = subtract(M, A);
  const nAB = normalize(AB);
  const t = dot(AM, nAB) / distance(A, B);
  const scalar = dot(AM, nAB);
  const P = add(A, scale(nAB, scalar));
  return { P, t };
}
