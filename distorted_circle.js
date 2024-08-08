const width = 1000;
const height = 500;

const stepSize = 15;
const amplitude = 25;
const borderWidth = 25;

const colors = [
  [
    "rgba(120,0,0,0.75)",
    "rgba(193, 18, 31,0.75)",
    "rgba(253, 240, 213,0.75)",
    "rgba(0, 48, 73,0.75)",
    "rgba(102, 155, 188,0.75)",
  ],
  [
    "rgba(38, 70, 83, 0.75)",
    "rgba(42, 157, 143, 0.75)",
    "rgba(233, 196, 106, 0.75)",
    "rgba(244, 162, 97, 0.75)",
    "rgba(231, 111, 81, 0.75)",
  ],
  [
    "rgba(0, 48, 73, 0.75)",
    "rgba(214, 40, 40, 0.75)",
    "rgba(247, 127, 0, 0.75)",
    "rgba(252, 191, 73, 0.75)",
    "rgba(234, 226, 183, 0.75)",
  ],
  [
    "rgba(0, 8, 20, 0.75)",
    "rgba(0, 29, 61, 0.75)",
    "rgba(0, 53, 102, 0.75)",
    "rgba(255, 195, 0, 0.75)",
    "rgba(255, 214, 10, 0.75)",
  ],
  [
    "rgba(3, 7, 30, 0.75)",
    "rgba(55, 6, 23, 0.75)",
    "rgba(106, 4, 15, 0.75)",
    "rgba(157, 2, 8, 0.75)",
    "rgba(208, 0, 0, 0.75)",
    "rgba(220, 47, 2, 0.75)",
    "rgba(232, 93, 4, 0.75)",
    "rgba(244, 140, 6, 0.75)",
    "rgba(250, 163, 7, 0.75)",
    "rgba(255, 186, 8, 0.75)",
  ],
  [
    "rgba(8, 61, 119, 0.75)",
    "rgba(235, 235, 211, 0.75)",
    "rgba(244, 211, 94, 0.75)",
    "rgba(238, 150, 75, 0.75)",
    "rgba(249, 87, 56, 0.75)",
  ],
  [
    "rgba(53, 80, 112, 0.75)",
    "rgba(109, 89, 122, 0.75)",
    "rgba(181, 101, 118, 0.75)",
    "rgba(229, 107, 111, 0.75)",
    "rgba(234, 172, 139, 0.75)",
  ],
  [
    "rgba(247, 146, 86, 0.75)",
    "rgba(251, 209, 162, 0.75)",
    "rgba(125, 207, 182, 0.75)",
    "rgba(0, 178, 202, 0.75)",
    "rgba(29, 78, 137, 0.75)",
  ],
  [
    "rgba(239, 199, 194, 0.75)",
    "rgba(255, 229, 212, 0.75)",
    "rgba(191, 211, 193, 0.75)",
    "rgba(104, 166, 145, 0.75)",
    "rgba(105, 79, 93, 0.75)",
  ],
];

let chosenPalette;

function addBorder(fillColor) {
  noStroke();
  fill(fillColor);
  rect(0, 0, width, borderWidth);
  rect(0, 0, borderWidth, height);
  rect(width - borderWidth, 0, width, height);
  rect(0, height - borderWidth, width, height);
}

function drawDistortedCircle(cx, cy, radius, noiseAmount) {
  stroke("black");
  strokeWeight(1);
  noFill();
  beginShape();
  for (let a = 0; a <= TWO_PI; a += 0.05) {
    let x = cx + cos(a) * radius;
    let y = cy + sin(a) * radius;
    let nX = x + random(-noiseAmount, noiseAmount);
    let nY = y + random(-noiseAmount, noiseAmount);
    curveVertex(nX, nY);
  }
  endShape(CLOSE);
}

function threeCircles() {
  let radius = 10;
  //   let radiusIncrease = 1;
  let noise = 0.1;

  for (let c = 1; c <= 100; c++) {
    drawDistortedCircle(100, 100, c * radius, noise);
    noise += 0.1;
    radius += 0.01;
  }

  radius = 5;
  //   let radiusIncrease = 1;
  noise = 0.2;
  for (let c = 1; c <= 100; c++) {
    drawDistortedCircle(400, 400, c * radius, noise);
    noise += 0.1;
    radius += 0.01;
  }

  radius = 5;
  //   let radiusIncrease = 1;
  noise = 0.2;
  for (let c = 1; c <= 100; c++) {
    drawDistortedCircle(700, 250, c * radius, noise);
    noise += 0.1;
    radius += 0.01;
  }
}

function threeCirclesWithBackground() {
  let radius = 3;
  let radiusIncrease = radius;
  let noise = 0.1;
  let circleCount = 100;
  fill("rgba(248, 214, 204, 0.75)");
  circle(100, 100, (radius + circleCount * radius) * 2);
  for (let c = 1; c <= circleCount; c++) {
    drawDistortedCircle(100, 100, radius, noise);
    noise += 0;
    radius += radiusIncrease;
  }

  radius = 3;
  radiusIncrease = radius;
  noise = 0.1;
  circleCount = 150;
  fill("rgba(248, 214, 204, 0.75)");
  circle(500, 500, (radius + circleCount * radius) * 2);
  for (let c = 1; c <= circleCount; c++) {
    drawDistortedCircle(500, 500, radius, noise);
    noise += 0;
    radius += radiusIncrease;
  }

  radius = 3;
  radiusIncrease = radius;
  noise = 0.1;
  circleCount = 150;
  fill("rgba(248, 214, 204, 0.75)");
  circle(700, 250, (radius + circleCount * radius) * 2);
  for (let c = 1; c <= circleCount; c++) {
    drawDistortedCircle(700, 250, radius, noise);
    noise += 0;
    radius += radiusIncrease;
  }
}

function drawCircleWithBackground(cX, cY, radius, noise, circleCount) {
  noStroke();
  let radiusIncrease = radius;
  //   fill("rgba(248, 214, 204, 0.75)");
  fill(chosenPalette[floor(random(chosenPalette.length))]);
  circle(cX, cY, (radius + circleCount * radius) * 2);

  stroke(1);
  for (let c = 1; c <= circleCount + 1; c++) {
    drawDistortedCircle(cX, cY, radius, noise);
    noise += 0;
    radius += radiusIncrease;
  }
}

function setup() {
  createCanvas(width, height);
  noStroke();
  background("white");

  chosenPalette = colors[floor(random(colors.length))];

  //   drawCircleWithBackground(700, 250, 3, 0.1, 150);
  for (let c = 0; c < 25; c++) {
    drawCircleWithBackground(
      random(0, width),
      random(0, height),
      random(3, 10),
      random(0.1, 2),
      random(10, 50)
    );
  }

  addBorder("white");
}
