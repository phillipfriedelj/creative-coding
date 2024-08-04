let rectangles = [];
let densitySlider,
  gridSizeSlider,
  noiseScaleSlider,
  noiseAmountSlider,
  randomAmountSlider,
  divisionStepsSlider,
  minSizeSlider;
let margin = 5;
let needsUpdate = true;
let divisionSteps = 100;
let size = 600;
let minSize = 15;
const densityIncrease = 0.3;
const gridDecrease = 0.4;

function setup() {
  createCanvas(size, size);

  // Create sliders
  densitySlider = createSlider(0, 1, 0.5, 0.01);
  densitySlider.position(10, height + 10);
  densitySlider.input(() => (needsUpdate = true));
  createP("Density").position(160, height);

  gridSizeSlider = createSlider(2, 20, 10, 1);
  gridSizeSlider.position(10, height + 40);
  gridSizeSlider.input(() => (needsUpdate = true));
  createP("Grid Size").position(160, height + 30);

  noiseScaleSlider = createSlider(0.001, 0.1, 0.01, 0.001);
  noiseScaleSlider.position(10, height + 70);
  noiseScaleSlider.input(() => (needsUpdate = true));
  createP("Noise Scale").position(160, height + 60);

  noiseAmountSlider = createSlider(0, 20, 5, 1);
  noiseAmountSlider.position(250, height + 10);
  noiseAmountSlider.input(() => (needsUpdate = true));
  createP("Noise Amount").position(400, height);

  randomAmountSlider = createSlider(0, 10, 2, 0.5);
  randomAmountSlider.position(250, height + 40);
  randomAmountSlider.input(() => (needsUpdate = true));
  createP("Random Amount").position(400, height + 30);

  divisionStepsSlider = createSlider(0, 100, 7, 1);
  divisionStepsSlider.position(250, height + 70);
  divisionStepsSlider.input(() => (needsUpdate = true));
  createP("Division Steps").position(400, height + 60);

  minSizeSlider = createSlider(0, 100, 7, 1);
  minSizeSlider.position(250, height + 100);
  minSizeSlider.input(() => (needsUpdate = true));
  createP("Min Size").position(400, height + 90);

  // Create initial rectangle
  rectangles.push(new Rectangle(50, 50, 700, 500));

  // Draw rectangle
  for (let step = 0; step < divisionSteps; step++) {
    rectangles = subdivideRectArray(rectangles);
  }

  //   for (let i = 0; i < rectangles.length; i++) {
  //     //   console.log("RECT :: ", rectangles[i]);
  //     rectangles[i].draw();
  //   }
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

  if (dir === "height" && rect.height >= minSize) {
    breakPoint = rect.y + Math.random() * (rect.height - minSize) + minSize / 2;
    rectOne = new Rectangle(
      rect.x,
      rect.y,
      rect.width,
      breakPoint - rect.y,
      (rect.density += densityIncrease),
      (rect.gridSize -= gridDecrease)
    );
    rectTwo = new Rectangle(
      rect.x,
      breakPoint,
      rect.width,
      rect.y + rect.height - breakPoint,
      (rect.density += densityIncrease),
      (rect.gridSize -= gridDecrease)
    );
  } else if (dir === "width" && rect.width >= minSize) {
    breakPoint = rect.x + Math.random() * (rect.width - minSize) + minSize / 2;
    rectOne = new Rectangle(
      rect.x,
      rect.y,
      breakPoint - rect.x,
      rect.height,
      (rect.density += densityIncrease),
      (rect.gridSize -= gridDecrease)
    );
    rectTwo = new Rectangle(
      breakPoint,
      rect.y,
      rect.x + rect.width - breakPoint,
      rect.height,
      (rect.density += densityIncrease),
      (rect.gridSize -= gridDecrease)
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

function draw() {
  if (needsUpdate) {
    background(220);

    // Update rectangle parameters
    rectangles[0].updateParams(
      densitySlider.value(),
      gridSizeSlider.value(),
      noiseScaleSlider.value(),
      noiseAmountSlider.value(),
      randomAmountSlider.value(),
      divisionStepsSlider.value(),
      minSizeSlider.value()
    );

    // Draw rectangle
    // for (let i = 0; i < rectangles.length; i++) {
    //   subdivideRectArray(rectangles);
    // }

    for (let i = 0; i < rectangles.length; i++) {
      //   console.log("RECT :: ", rectangles[i]);
      rectangles[i].draw();
    }

    needsUpdate = false;
  }
}

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.density = 0.5;
    this.gridSize = 10;
    this.noiseScale = 0.01;
    this.noiseAmount = 5;
    this.randomAmount = 2;
    this.dotSize = 2;
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
  }

  updateParams(
    density,
    gridSize,
    noiseScale,
    noiseAmount,
    randomAmount,
    newDivisionSteps,
    newMinSize
  ) {
    this.density = density;
    this.gridSize = gridSize;
    this.noiseScale = noiseScale;
    this.noiseAmount = noiseAmount;
    this.randomAmount = randomAmount;
    divisionSteps = newDivisionSteps;
    minSize = newMinSize;
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
          let noiseX =
            noise(x * this.noiseScale + this.noiseOffsetX, 0) *
              this.noiseAmount *
              2 -
            this.noiseAmount;
          let noiseY =
            noise(0, y * this.noiseScale + this.noiseOffsetY) *
              this.noiseAmount *
              2 -
            this.noiseAmount;

          let randX = random(-this.randomAmount, this.randomAmount);
          let randY = random(-this.randomAmount, this.randomAmount);

          let displacedX = x + noiseX + randX;
          let displacedY = y + noiseY + randY;

          ellipse(displacedX, displacedY, this.dotSize);
        }
      }
    }
  }
}
