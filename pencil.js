// function pencilLine(x1, y1, x2, y2, strokeWeight, density = 0.8) {
//   let steps = dist(x1, y1, x2, y2);
//   let perpX = -(y2 - y1) / steps;
//   let perpY = (x2 - x1) / steps;

//   for (let i = 0; i < strokeWeight; i++) {
//     let offset = map(
//       i,
//       0,
//       strokeWeight - 1,
//       -strokeWeight / 2,
//       strokeWeight / 2
//     );
//     let startX = x1 + perpX * offset;
//     let startY = y1 + perpY * offset;
//     let endX = x2 + perpX * offset;
//     let endY = y2 + perpY * offset;

//     // Determine if this is an outer layer
//     let isOuterLayer = i === 0 || i === strokeWeight - 1;

//     for (let t = 0; t <= 1; t += 1 / steps) {
//       let x = lerp(startX, endX, t);
//       let y = lerp(startY, endY, t);
//       console.log("x", y, "y", y);
//       // Apply randomness only to outer layers
//       if (!isOuterLayer || random() < density) {
//         point(x, y);
//       }
//     }
//   }
// }

function pencilLine(x1, y1, x2, y2, lineWeight, density = 0.8) {
  let steps = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let perpAngle = angle + HALF_PI;

  // Draw the main solid line
  strokeWeight(strokeWeight - 2);
  line(x1, y1, x2, y2);

  // Draw the pencil effect on the edges
  strokeWeight(1);
  for (let offset = -lineWeight / 2; offset <= lineWeight / 2; offset += 1) {
    if (abs(offset) < lineWeight / 2 - 1) continue; // Skip inner part

    let startX = x1 + cos(perpAngle) * offset;
    let startY = y1 + sin(perpAngle) * offset;

    for (let i = 0; i <= steps; i++) {
      if (random() < density) {
        let t = i / steps;
        let x = lerp(startX, x2 + cos(perpAngle) * offset, t);
        let y = lerp(startY, y2 + sin(perpAngle) * offset, t);
        point(x, y);
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(220);
  stroke(0);
  //   strokeWeight(1);

  // Draw a pencil line
  //   pencilLine(50, 50, 350, 350, 2, 1);
  pencilLine(50, 50, 350, 50, 2, 0.75);
  pencilLine(50, 54, 350, 54, 2, 0.75);
  pencilLine(50, 56, 350, 56, 2, 0.75);
  pencilLine(50, 60, 350, 60, 2, 0.75);
  pencilLine(50, 64, 350, 64, 2, 0.75);
  pencilLine(50, 68, 350, 68, 2, 0.75);
  pencilLine(50, 72, 350, 72, 2, 0.75);
  pencilLine(50, 76, 350, 76, 2, 0.75);
  pencilLine(50, 80, 350, 80, 2, 0.75);
}
