const width = 1000;
const height = 600;

const amplitude = 15;
const borderWidth = 25;

const boundingBox = 100;

let stepSize = 5;
let flowVectors = [];
let flowElements = [];

class FlowPoint {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  visualize() {
    strokeWeight(3);
    point(this.x, this.y);

    strokeWeight(1);
    let vecX = this.x + cos(this.angle) * 10;
    let vecY = this.y + sin(this.angle) * 10;

    line(this.x, this.y, vecX, vecY);
  }
}

class FlowElement {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //   move() {
  //     if (this.x > width + boundingBox || this.y > height + boundingBox) {
  //       return;
  //     }

  //     let closestX = -1;
  //     let closestY = -1;
  //     let minDistance = Infinity;

  //     for (let x = 0; x < flowVectors.length; x++) {
  //       for (let y = 0; y < flowVectors[x].length; y++) {
  //         let distance = Math.sqrt(
  //           Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)
  //         );
  //         if (distance < minDistance) {
  //           minDistance = distance;
  //           closestX = x;
  //           closestY = y;
  //         }
  //       }
  //     }

  //     // Use the closest grid point to determine the angle
  //     let angle = flowVectors[closestX][closestY].angle;
  //     console.log("ANFLE ", angle);
  //     let x_step = 0.5 * cos(angle);
  //     let y_step = 0.5 * sin(angle);
  //     this.x += x_step;
  //     this.y += y_step;
  //   }

  move() {
    if (
      this.x < -boundingBox ||
      this.y < -boundingBox ||
      this.x > width + boundingBox ||
      this.y > height + boundingBox
    ) {
      return;
    }

    // Calculate the indices of the closest grid point
    let gridX = Math.floor((this.x + boundingBox) / stepSize);
    let gridY = Math.floor((this.y + boundingBox) / stepSize);

    // Ensure the indices are within bounds
    if (
      gridX < 0 ||
      gridX >= flowVectors.length ||
      gridY < 0 ||
      gridY >= flowVectors[0].length
    ) {
      return;
    }

    // Get the angle from the closest grid point
    let angle = flowVectors[gridX][gridY].angle;

    // Update the position based on the flow vector's angle
    let x_step = 0.5 * cos(angle);
    let y_step = 0.5 * sin(angle);
    this.x += x_step;
    this.y += y_step;
  }

  draw() {
    stroke("red");
    strokeWeight(2);
    point(this.x, this.y);
  }
}

function generateAngleGrid() {
  for (let x = 0 - boundingBox; x < width + boundingBox; x += stepSize) {
    let angles = [];
    for (let y = 0 - boundingBox; y < height + boundingBox; y += stepSize) {
      //   let a = random(0, TWO_PI);
      //   let a = (x / float(width)) * PI;
      //   let a = (x / float(width)) * PI + (y / float(height)) * PI;
      //   let n = noise(x * 0.005, y * 0.005);
      //   let a = map(n, 0.0, 1.0, 0, TWO_PI);
      let a = sin(x * 0.01) * cos(y * 0.01) * PI;
      //   let a = (x / width) * PI + (y / height) * PI;
      angles.push(new FlowPoint(x, y, a));
    }

    flowVectors.push(angles);
  }

  console.log("FV :: ", flowVectors);
}

function drawAngleGrid() {
  stroke("black");

  for (let x = 0; x < flowVectors.length; x++) {
    for (let y = 0; y < flowVectors[x].length; y++) {
      flowVectors[x][y].visualize();
    }
  }
}

function addBorder(fillColor) {
  noStroke();
  fill(fillColor);
  rect(0, 0, width, borderWidth);
  rect(0, 0, borderWidth, height);
  rect(width - borderWidth, 0, width, height);
  rect(0, height - borderWidth, width, height);
}

function roundToClosestGrid(value, stepSize) {
  return Math.round(value / stepSize) * stepSize;
}

function generateFlowElements(width, height, numElements) {
  for (let i = 0; i < numElements; i++) {
    let x = i * (width / numElements);
    let y = height / 2;
    flowElements.push(new FlowElement(x, y));
  }
}

function setup() {
  createCanvas(width, height);
  noStroke();
  background("#f8d6cc");

  generateAngleGrid();
  console.log("GRID :: ", flowVectors);
  drawAngleGrid();

  //   addBorder("#f8d6cc");
  for (let x = 400; x < 401; x++) {
    for (let y = 0; y < height; y += 10) {
      flowElements.push(new FlowElement(x, y));
    }
  }

  //   generateFlowElements(width, height, 100);
  //   console.log("FE :: ", flowElements);
}

function draw() {
  for (let i = 0; i < flowElements.length; i++) {
    flowElements[i].move();
    flowElements[i].draw();
  }
}
