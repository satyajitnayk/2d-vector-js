interCanvas.width = window.innerWidth;
interCanvas.height = window.innerHeight;

const A = { x: 200, y: 150 };
const B = { x: 150, y: 250 };
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

const ctx = interCanvas.getContext('2d');
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

  ctx.clearRect(0, 0, interCanvas.width, interCanvas.height);

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

function getIntersection(A, B, C, D) {
  /**
   Let's assume (Ix,Iy) is intersection point of Line AB & CD
   Ix = Ax + (Bx - Ax)t = Cx + (Dx - Cx)u
   Iy = Ay + (By - Ay)t = Cy + (Dy - Cy)u

   Ax + (Bx - Ax)t = Cx + (Dx - Cx)u
   Ax-Cx + (Bx-Ax)t = (Dx-Cx)u     ---- (i)

   Ay + (By - Ay)t = Cy + (Dy - Cy)u
   Ay-Cy + (By-Ay)t = (Dy-Cy)u

   (Dx-Cx)*(Ay-Cy) + (Dx-Cx)*(By-Ay)*t = (Dy-Cy)*(Dx-Cx)*u 
   use value (Dx-Cx)u from eq (i)

   (Dx-Cx)*(Ay-Cy) + (Dx-Cx)*(By-Ay)*t =(Ax-Cx)(Dy-Cy) + (Bx-Ax)(Dy-Cy)t
   - subtract (Ax-Cx)(Dy-Cy) from both sides
   - subtract (Dx-Cx)(By-Ay)t from both sides

   (Dx-Cx)*(Ay-Cy) - (Ax-Cx)(Dy-Cy) = (Bx-Ax)(Dy-Cy)t -(Dx-Cx)(By-Ay)t

   => t = ((Dx-Cx)*(Ay-Cy) - (Ax-Cx)*(Dy-Cy)) / ((Bx-Ax)(Dy-Cy) -(Dx-Cx)(By-Ay))
   => u = (Bx-Ax)*(Dy-Cy) - (Dx-Cx)* By - Ay) / ((Bx-Ax)(Dy-Cy) -(Dx-Cx)(By-Ay))
   FINAL value, using liner interpolation
   Ix = Ax + (Bx - Ax) * t
   Iy = Ay + (By - Ay) * t
   */

  const tNumerator = (D.x - C.x) * (A.y - C.y) - (A.x - C.x) * (D.y - C.y);
  const uNumerator = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);

  const denominator = (B.x - A.x) * (D.y - C.y) - (D.x - C.x) * (B.y - A.y);
  if (denominator != 0) {
    const t = tNumerator / denominator;
    const u = uNumerator / denominator;

    // return only when lines intersect
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      // do linear interpolation on either A-B or C-D to get intersection point
      return {
        x: A.x + (B.x - A.x) * t,
        y: A.y + (B.y - A.y) * t,
        offset: t,
      };
    }
  }
  return null;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function drawDot(point, label) {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 14px arial';
  ctx.fillText(label, point.x, point.y);
}