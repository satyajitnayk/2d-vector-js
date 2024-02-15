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

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function scale(p, scalar) {
  return { x: p.x * scalar, y: p.y * scalar };
}

function add(p1, p2) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}

function subtract(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function dot(p1, p2) {
  return p1.x * p2.x + p1.y * p2.y;
}

function normalize(p) {
  return scale(p, 1 / magnitude(p));
}

function toPolar({ x, y }) {
  return { dir: direction({ x, y }), mag: magnitude({ x, y }) };
}

function toXY({ mag, dir }) {
  return { x: Math.cos(dir) * mag, y: Math.sin(dir) * mag };
}

function direction({ x, y }) {
  return Math.atan2(y, x);
}

function magnitude({ x, y }) {
  return Math.hypot(x, y);
}
