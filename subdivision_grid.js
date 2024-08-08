const margin = 0;
let size = 600; // This is the drawable area
let canvasSize = size + 2 * margin; // This is the total canvas size

const divisionSteps = 20;
const minSize = 20;

const densityIncrease = 0.4;
const gridDecrease = 0.25;

let noiseScale = 0.01;
let dotSize = 2;
let noiseAmount = 2; // Max displacement from noise
let randomAmount = 2; // Max additional random displacement

let startDensity = 0.2;
let startGridSize = 3;

const colors = ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482"];

class Rectangle {
  constructor(x, y, width, height, density, gridSize, fill) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.density = density;
    this.dotSize = 1;
    this.gridSize = gridSize;
    this.fill = fill;
    this.stroke = "#003049";
    this.noiseOffsetX = random(1000); // Add these lines
    this.noiseOffsetY = random(1000);
  }

  draw() {
    strokeWeight(2);
    stroke("black");

    // stroke("red");
    fill("#003049");
    fill(this.fill);
    stroke("black");
    rect(this.x, this.y, this.width, this.height);

    // } else {
    //   for (let x = this.x; x < this.x + this.width; x += this.gridSize) {
    //     for (let y = this.y; y < this.y + this.height; y += this.gridSize) {
    //       if (random() < this.density) {
    //         let noiseX =
    //           noise(x * noiseScale + this.noiseOffsetX, 0) * noiseAmount * 2 -
    //           noiseAmount;
    //         let noiseY =
    //           noise(0, y * noiseScale + this.noiseOffsetY) * noiseAmount * 2 -
    //           noiseAmount;
    //         let randX = random(-randomAmount, randomAmount);
    //         let randY = random(-randomAmount, randomAmount);
    //         let displacedX = x + noiseX + randX + margin;
    //         let displacedY = y + noiseY + randY + margin;
    //         ellipse(displacedX, displacedY, dotSize);
    //       }
    //     }
    //   }
    // }
    // noStroke();
    // fill("#003049");

    // for (let x = this.x + margin; x < this.x + this.width; x += this.gridSize) {
    //   for (
    //     let y = this.y + margin;
    //     y < this.y + this.height;
    //     y += this.gridSize
    //   ) {
    //     if (random() < this.density) {
    //       // Noise-based displacement
    //       let noiseX =
    //         noise(x * noiseScale + this.noiseOffsetX, 0) * noiseAmount * 2 -
    //         noiseAmount;
    //       let noiseY =
    //         noise(0, y * noiseScale + this.noiseOffsetY) * noiseAmount * 2 -
    //         noiseAmount;

    //       // Additional random displacement
    //       let randX = random(-randomAmount, randomAmount);
    //       let randY = random(-randomAmount, randomAmount);

    //       // Comine noise and random displacements
    //       let displacedX = x + noiseX + randX;
    //       let displacedY = y + noiseY + randY;

    //       ellipse(displacedX, displacedY, dotSize);
    //     }
    //   }
    // }
  }

  darkenColor(r, g, b, amount) {
    return color(max(r - amount, 0), max(g - amount, 0), max(b - amount, 0));
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

function subdivideRect(rect, depth = 0) {
  if (depth >= divisionSteps) return [rect];

  let subdivideChance = map(rect.width * rect.height, 0, size * size, 0.9, 0.1);
  let fillChance = map(rect.width * rect.height, 0, size * size, 0.1, 0.9);

  // Adjust fillChance based on depth
  fillChance = fillChance * (1 - depth / divisionSteps);

  if (
    (random() > subdivideChance && depth > 0) ||
    rect.width < minSize * 1.5 ||
    rect.height < minSize * 1.5
  ) {
    return [rect];
  }

  let newDensity = rect.density + densityIncrease;
  let newGridSize = rect.gridSize - gridDecrease;

  function createSubRect(x, y, w, h) {
    return new Rectangle(
      x,
      y,
      w,
      h,
      newDensity,
      newGridSize,
      random() < fillChance ? "#003049" : "transparent"
    );
  }

  let rectOne = createSubRect(rect.x, rect.y, rect.width / 2, rect.height / 2);
  let rectTwo = createSubRect(
    rect.x + rect.width / 2,
    rect.y,
    rect.width / 2,
    rect.height / 2
  );
  let rectThree = createSubRect(
    rect.x,
    rect.y + rect.height / 2,
    rect.width / 2,
    rect.height / 2
  );
  let rectFour = createSubRect(
    rect.x + rect.width / 2,
    rect.y + rect.height / 2,
    rect.width / 2,
    rect.height / 2
  );

  return [
    ...subdivideRect(rectOne, depth + 1),
    ...subdivideRect(rectTwo, depth + 1),
    ...subdivideRect(rectThree, depth + 1),
    ...subdivideRect(rectFour, depth + 1),
  ];
}

function subdivideRectArray(rects) {
  let newRects = [];
  for (let rect of rects) {
    newRects.push(...subdivideRect(rect, 0));
  }
  return newRects;
}

function setup() {
  createCanvas(size, size);
  let randomColor = colors[floor(random(colors.length))];
  background(randomColor);

  let rects = [];
  rects.push(new Rectangle(0, 0, size, size, startDensity, startGridSize));

  while (rects.length <= 1) {
    rects = subdivideRectArray(rects);
  }
  //   for (let step = 0; step < divisionSteps; step++) {
  //   }

  //   let r = Math.floor(random(colorPalettes.length - 1));
  //   let palette = colorPalettes[r];

  for (let i = 0; i < rects.length; i++) {
    rects[i].draw();
  }
}
