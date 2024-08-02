let size = 800;
let squareCount = 10;
let spacing = 50;

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

function drawLines() {
  //   rectMode(CENTER);
  angleMode(DEGREES);
  strokeWeight(1);
  stroke("#fefae0");
  //   strokeWeight(10);

  const scalingFactor = 0.05;
  const layerSpacing = 0;
  const layers = 75;
  let startCount = 5;

  const width = 15;
  //   const height = (size - layers * layerSpacing) / layers;
  const height = size / layers;
  //   console.log("H: ", height);
  const availableSpace = size;
  //   console.log("correct -- ", availableSpace);
  fill("black");
  stroke("black");
  for (let i = 1; i <= layers; i++) {
    let lineArea = availableSpace / startCount;
    // console.log("LA: ", lineArea);
    for (let j = 0; j < startCount; j++) {
      const startX = lineArea * j;
      //   console.log("SX : ", startX);
      const x = lineArea / 2 + startX - width / 2 + spacing;
      //   console.log("X - ", x);
      const y = (i - 1) * height + layerSpacing + spacing;

      //   stroke("pink");
      //   point(startX, y);
      push();
      translate(x, y);
      rotate(random(0, 360) * (i - 1) * scalingFactor);
      rect(0, 0, width, height, 20);
      pop();
      //   stroke("blue");
      //   point(x, y);
      //   stroke("black");
    }
    startCount++;
  }
}

function drawPoints() {
  //   rectMode(CENTER);
  angleMode(DEGREES);
  strokeWeight(1);
  stroke("#fefae0");
  //   strokeWeight(10);

  const scalingFactor = 0.05;
  const layerSpacing = 0;
  const layers = 850;
  let startCount = 15;

  const width = 15;
  //   const height = (size - layers * layerSpacing) / layers;
  const height = size / layers;
  //   console.log("H: ", height);
  const availableSpace = size;
  //   console.log("correct -- ", availableSpace);
  fill("black");
  stroke("black");
  for (let i = 1; i <= layers; i++) {
    let lineArea = availableSpace / startCount;
    // console.log("LA: ", lineArea);
    for (let j = 0; j < startCount; j++) {
      const startX = lineArea * j;
      //   console.log("SX : ", startX);
      const x = lineArea / 2 + startX - width / 2 + spacing;
      //   console.log("X - ", x);
      const y = (i - 1) * height + layerSpacing + spacing;

      //   stroke("pink");
      //   point(startX, y);
      //   push();
      //   translate(x, y);
      //   rotate(random(0, 360) * (i - 1) * scalingFactor);
      //   rect(0, 0, width, height, 20);
      //   pop();
      point(x, y);
      //   stroke("blue");
      //   point(x, y);
      //   stroke("black");
    }
    startCount++;
  }
}

function drawRulers() {
  push();
  noStroke();
  fill("black");

  for (let x = 0; x < width; x += 10) {
    rect(x, 0, 1, height);
  }
  for (let y = 0; y < height; y += 10) {
    rect(0, y, width, 1);
  }
  pop();
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
  //   fill("red");
  //   square(0 + spacing, 0 + spacing, size);
  // drawRulers();

  //   drawLines();
  drawPoints();

  addNoise();
}
