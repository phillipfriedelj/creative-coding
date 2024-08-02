let size = 600;
let squareCount = 200;
let tx = 0;
let ty = 0;

function drawSquares() {
  strokeWeight(0);
  colorMode(HSL);

  let squareSide = size / squareCount;
  for (let x = 0; x < size; x += squareSide) {
    ty = 0;
    for (let y = 0; y < size; y += squareSide) {
      let h = map(noise(tx, ty), 0, 1, 0, 360);
      let s = 100;
      let l = 65;
      fill(h, s, l);
      rect(x, y, squareSide, squareSide);

      ty += 0.01;
    }
    tx += 0.01;
  }
}

function drawRandomPoints() {
  const colors = ["#c1121f", "#003049", "#669bbc"];
  let scalingFactorX = 0.1;
  let scalingFactorY = 0.002;
  strokeWeight(1);
  let increment = 2;
  for (let x = 0; x < size; x += increment) {
    fill(colors[floor(random(0, colors.length))]);
    // beginShape();
    for (let y = 0; y < size; y += increment) {
      //   vertex(
      //     x + noise(tx, ty) * x * y * scalingFactorX,
      //     y + noise(tx, ty) * x * y * scalingFactorY
      //   );
      point(
        x + noise(tx, ty) * x * y * scalingFactorX,
        y + noise(tx, ty) * x * y * scalingFactorY
      );
      ty += 0.01;
    }
    // endShape(CLOSE);
    tx += 0.01;
  }
}

function addNoise() {
  // Load the pixels array.
  loadPixels();

  // Copy the top half of the canvas to the bottom.
  for (let i = 0; i < pixels.length; i += 4) {
    // Red.
    pixels[i] += random(-25, 25);
    // Green.
    pixels[i + 1] += random(-25, 25);
    // Blue.
    pixels[i + 2] += random(-25, 25);
    // Alpha.
    pixels[i + 3] += random(-25, 25);
  }

  updatePixels();
}

function setup() {
  createCanvas(size, size);
  background("#fdf0d5");
  //   drawSquares();
  drawRandomPoints();

  addNoise();
}

function draw() {}
