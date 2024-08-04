let size = 600;
const divisionSteps = 7;
const minSize = 20;
const margin = 5;

const densityIncrease = 0.3;
const gridDecrease = 0.4;

let tX = 0;
let tY = 0;

const colors = [
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
];

class Rectangle {
  constructor(x, y, width, height, density, gridSize) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.density = density;
    this.dotSize = 1;
    this.gridSize = gridSize;
  }

  draw() {
    noStroke();
    fill("#003049");

    let dotSize = 2;

    console.log(
      "DENSITIY ::: ",
      this.density,
      "---- DRAWING: ",
      this.x,
      " -- ",
      this.y,
      " -- ",
      this.width,
      " -- ",
      this.height
    );

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
          //   let rand = noise(xT, yT) * 10;
          //   ellipse(x + random(-1.5, 1.5), y + random(-1.5, 1.5), dotSize);
          ellipse(x + noise(tX) * 10, y + noise(tY) * 10, dotSize);
        }

        tY += 0.1;
      }
      tX += 0.1;
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

function setup() {
  createCanvas(size, size);
  let randomColor = colors[floor(random(colors.length))];
  background(randomColor);

  let rects = [];
  rects.push(new Rectangle(0, 0, size, size, 0.45, 7));

  for (let step = 0; step < divisionSteps; step++) {
    rects = subdivideRectArray(rects);
  }

  //   let r = Math.floor(random(colorPalettes.length - 1));
  //   let palette = colorPalettes[r];

  for (let i = 0; i < rects.length; i++) {
    //   console.log("RECT :: ", rects[i]);
    rects[i].draw();
  }
}
