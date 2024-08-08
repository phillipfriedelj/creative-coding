let margin = 10;
let size = 600;
let spacing = 10;
let colors = ["#edede9", "#d6ccc2", "#f5ebe0", "#e3d5ca", "#d5bdaf"];

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

function drawTriangle() {
  for (let i = spacing * 4; i < size - margin; i += spacing) {
    pencilLine(margin, i, size - margin, size - margin, 2, 0.75);
    // line(margin, i, size - margin, size - margin);
  }
}

function drawInverseTriangle() {
  for (let i = margin; i < size - margin - spacing; i += spacing) {
    pencilLine(margin, margin, size - margin, i, 2, 0.75);
    // line(margin, margin, size - margin, i);
  }
}

function setup() {
  createCanvas(size, size);
  let randomColor = colors[floor(random(colors.length))];
  background(randomColor);
  smooth();
  stroke("black");
  strokeWeight(3);
  drawTriangle();
  drawInverseTriangle();

  //   save("5000Shapes.png");
}
