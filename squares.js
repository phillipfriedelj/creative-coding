let size = 800;
let squareCount = 10;
let spacing = 5;

let colorPalettes = [
  ["#ccd5ae", "#e9edc9", "#faedcd", "#d4a373"],
  ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
  ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
  ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482"],
  [
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#e9d8a6",
    "#ee9b00",
    "#ca6702",
    "#bb3e03",
    "#ae2012",
    "#9b2226",
  ],
];

function drawRoundedSquares() {
  strokeWeight(1);
  stroke("#fefae0");
  let colors = ["#ccd5ae", "#e9edc9", "#faedcd", "#d4a373"];
  let squareSide = (size - (squareCount - 1) * spacing) / squareCount;

  for (let x = spacing; x < size; x += squareSide + spacing) {
    for (let y = spacing; y < size; y += squareSide + spacing) {
      let randColor = colors[floor(random(0, colors.length))];
      fill(randColor);
      push();
      square(
        x,
        y,
        squareSide,
        random(0, 20),
        random(0, 20),
        random(0, 20),
        random(0, 20)
      );
    }
  }
}

function drawSquares() {
  rectMode(CENTER);
  angleMode(DEGREES);
  strokeWeight(1);
  stroke("#fefae0");

  let colors = colorPalettes[floor(random(0, colorPalettes.length))];
  let squareSide = (size - (squareCount - 1) * spacing) / squareCount;
  let steps = 5;
  let sizeDecrease = squareSide / steps;

  for (let x = spacing; x < size; x += squareSide + spacing) {
    for (let y = spacing; y < size; y += squareSide + spacing) {
      let randColor = colors[floor(random(0, colors.length))];
      fill(randColor);
      push();
      translate(x + squareSide / 2, y + squareSide / 2);
      square(0, 0, squareSide);
      pop();
      for (let i = 1; i <= steps; i++) {
        let newSquareSize = squareSide - i * sizeDecrease;
        let randColor = colors[floor(random(0, colors.length))];
        fill(randColor);
        push();
        translate(x + squareSide / 2, y + squareSide / 2);
        rotate(random(0, 360));
        square(
          0,
          0,
          newSquareSize,
          random(0, 20),
          random(0, 20),
          random(0, 20),
          random(0, 20)
        );
        pop();
      }
    }
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
  createCanvas(size + spacing * 2, size + spacing * 2);
  background("#fefae0");
  drawSquares();

  addNoise();
}
