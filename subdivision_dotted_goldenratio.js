const margin = 5;
let size = 600 + 2 * margin;
const divisionSteps = 10;
const minSize = 20;

const densityIncrease = 0.3;
const gridDecrease = 0.5;

let noiseScale = 0.01;
let dotSize = 2;
let noiseAmount = 2; // Max displacement from noise
let randomAmount = 2; // Max additional random displacement

let startDensity = 0.2;
let startGridSize = 5;

const goldenRatio = 1.61803398875;

const colors = ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482"];

class Rectangle {
  constructor(x, y, width, height, density, gridSize) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.density = density;
    this.dotSize = 1;
    this.gridSize = gridSize;
    this.noiseOffsetX = random(1000); // Add these lines
    this.noiseOffsetY = random(1000);
  }

  draw() {
    noStroke();
    fill("#003049");

    for (
      let x = this.x + margin;
      x < this.x + this.width - margin;
      x += this.gridSize
    ) {
      for (
        let y = this.y + margin;
        y < this.y + this.height - margin;
        y += this.gridSize
      ) {
        if (random() < this.density) {
          // Noise-based displacement
          let noiseX =
            noise(x * noiseScale + this.noiseOffsetX, 0) * noiseAmount * 2 -
            noiseAmount;
          let noiseY =
            noise(0, y * noiseScale + this.noiseOffsetY) * noiseAmount * 2 -
            noiseAmount;

          // Additional random displacement
          let randX = random(-randomAmount, randomAmount);
          let randY = random(-randomAmount, randomAmount);

          // Comine noise and random displacements
          let displacedX = x + noiseX + randX;
          let displacedY = y + noiseY + randY;

          ellipse(displacedX, displacedY, dotSize);
        }
      }
    }
  }
}

function dotting(color, density) {
  stroke(color);
  strokeWeight(2);

  let startX = 100;
  let startY = 100;
  let width = 250;
  let height = 250;
  //   let gridSize = 3;

  //   let density = 0.55; // Probability of drawing a dot in each cell
  let dotSize = 4;

  for (let x = startX; x < startX + width; x += dotSize) {
    for (let y = startY; y < startY + height; y += dotSize) {
      if (random() < density) {
        ellipse(x + random(-5, 5), y + random(-5, 5), dotSize);
      }
    }
  }
}

function subdivideRect(rect) {
  let subdivideChance = map(rect.width * rect.height, 0, size * size, 0.1, 0.9);
  if (
    random() > subdivideChance ||
    rect.width < minSize ||
    rect.height < minSize
  ) {
    return [rect];
  }

  let rectOne, rectTwo;
  let breakPoint;
  let dir = rect.width > rect.height ? "width" : "height";

  let newDensity = rect.density + densityIncrease;
  let newGridSize = rect.gridSize - gridDecrease;

  if (dir === "height" && rect.height >= minSize) {
    breakPoint = rect.y + rect.height / goldenRatio;
    rectOne = new Rectangle(
      rect.x,
      rect.y,
      rect.width,
      breakPoint - rect.y,
      newDensity,
      newGridSize
    );
    rectTwo = new Rectangle(
      rect.x,
      breakPoint,
      rect.width,
      rect.y + rect.height - breakPoint,
      newDensity,
      newGridSize
    );
  } else if (dir === "width" && rect.width >= minSize) {
    breakPoint = rect.x + rect.width / goldenRatio;
    rectOne = new Rectangle(
      rect.x,
      rect.y,
      breakPoint - rect.x,
      rect.height,
      newDensity,
      newGridSize
    );
    rectTwo = new Rectangle(
      breakPoint,
      rect.y,
      rect.x + rect.width - breakPoint,
      rect.height,
      newDensity,
      newGridSize
    );
  } else {
    return [rect];
  }

  return [...subdivideRect(rectOne), ...subdivideRect(rectTwo)];
}

function subdivideRectArray(rects) {
  let newRects = [];
  for (let rect of rects) {
    newRects.push(...subdivideRect(rect));
  }
  return newRects;
}

function setup() {
  createCanvas(size, size);
  let randomColor = colors[floor(random(colors.length))];
  background(randomColor);

  let rects = [];
  rects.push(
    new Rectangle(
      margin,
      margin,
      size - margin,
      size - margin,
      startDensity,
      startGridSize
    )
  );

  for (let step = 0; step < divisionSteps; step++) {
    rects = subdivideRectArray(rects);
  }

  //   let r = Math.floor(random(colorPalettes.length - 1));
  //   let palette = colorPalettes[r];

  for (let i = 0; i < rects.length; i++) {
    rects[i].draw();
  }
}
