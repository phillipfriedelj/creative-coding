const width = 1000;
const height = 500;

const stepSize = 5;
const amplitude = 15;
const borderWidth = 25;

function addBorder(fillColor) {
  noStroke();
  fill(fillColor);
  rect(0, 0, width, borderWidth);
  rect(0, 0, borderWidth, height);
  rect(width - borderWidth, 0, width, height);
  rect(0, height - borderWidth, width, height);
}

function sineAndCosWave() {
  stroke(4);
  noFill();
  beginShape();

  let step = "sine";

  for (let y = -stepSize * 5; y < height + stepSize * 5; y += stepSize) {
    beginShape();
    for (let x = -amplitude * 20; x < width + amplitude * 20; x++) {
      let newY;
      if (step === "sine") {
        newY = amplitude * sin(x * 0.09) + y;
        vertex(x, newY);
      } else {
        newY = amplitude * cos(x * 0.09) + y;
        vertex(x + 2 * amplitude, newY);
      }
    }

    step = step === "sine" ? "cos" : "sine";

    endShape();
  }
}

function sineWave() {
  stroke(4);
  noFill();
  beginShape();

  for (let y = 0; y < height; y += stepSize) {
    beginShape();
    for (let x = 0; x < width; x++) {
      let newY = 15 * sin(x * 0.09) + y;
      vertex(x, newY);
    }
    endShape();
  }
}

function sineWave() {
  stroke(4);
  noFill();
  beginShape();

  for (let y = 0; y < height; y += stepSize) {
    beginShape();
    for (let x = 0; x < width; x++) {
      let newY = 15 * sin(x * 0.09) + y;
      vertex(x, newY);
    }
    endShape();
  }
}

function vertSineWave() {
  stroke(4);
  noFill();
  beginShape();

  for (let y = 0; y < width; y += stepSize) {
    beginShape();
    for (let x = 0; x < height; x++) {
      let newY = 15 * sin(x * 0.09) + y;
      vertex(newY, x);
    }
    endShape();
  }
}

function drawSineShape(startX, startY, endX, endY) {
  noStroke();
  fill("#f8d6cc");
  beginShape();

  for (let x = startX; x < endX; x++) {
    let y = 15 * sin(x * 0.09) + startY;
    vertex(x, y);
  }

  for (let x = endX - 1; x >= startX; x--) {
    let y = 15 * sin(x * 0.09) + endY;
    vertex(x, y);
  }

  endShape();
}

function drawFilledSineShape(startX, startY, endX, endY) {
  noStroke();
  fill("#f8d6cc");
  beginShape();

  let startVectors = [];
  let endVectors = [];

  let startCount = 0;
  for (let x = startX; x < endX; x++) {
    let y = 15 * sin(x * 0.09) + startY;
    vertex(x, y);
    startVectors.push({ x, y });
    startCount++;
  }

  let endCount = 0;
  for (let x = endX - 1; x >= startX; x--) {
    let y = 15 * sin(x * 0.09) + endY;
    vertex(x, y);
    endVectors.push({ x, y });
    endCount++;
  }
  endShape(CLOSE);
  stroke(4);

  for (let p = 0; p < startVectors.length; p += 4) {
    line(
      startVectors[p].x,
      startVectors[p].y,
      endVectors[endVectors.length - 1 - p].x,
      endVectors[endVectors.length - 1 - p].y
    );
  }
}

function setup() {
  createCanvas(width, height);
  noStroke();
  background("#f8d6cc");

  sineWave();

  //   drawSineShape(250, 150, 400, 300);
  //   drawFilledSineShape(250, 150, 450, 300);

  //   for (let s = 0; s < 5; s++) {
  let startX = floor(random(100, width - 100));
  let startY = floor(random(100, height - 100));
  let endX = floor(random(startX, width));
  let endY = floor(random(startY, height));
  drawFilledSineShape(startX, startY, endX, endY);
  //   }
  //   drawSineShape(800, 400, 950, 450);
  //   sineAndCosWave();

  //Fence like thing
  //   sineWave();
  //   vertSineWave();

  addBorder("#f8d6cc");
}
