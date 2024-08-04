let size = 600;

let xT = 0;
let yT = 0;

function dotting(color, density) {
  stroke(color);
  strokeWeight(2);

  let startX = 100;
  let startY = 100;
  let width = 250;
  let height = 250;
  let gridSize = 5;

  //   let density = 0.55; // Probability of drawing a dot in each cell

  for (let x = startX; x < startX + width; x += gridSize) {
    for (let y = startY; y < startY + height; y += gridSize) {
      let dotSize = random(0.1, 1);
      if (random() < density) {
        let rand = noise(xT, yT) * 10;
        // ellipse(x + random(-2, 2), y + random(-2, 2), dotSize);
        ellipse(x + rand * 10, y + rand * 10, dotSize);
      }

      yT += 0.01;
    }
    xT += 0.01;
  }
}

function dottingVert(color, density) {
  stroke(color);
  strokeWeight(2);

  let startX = 100;
  let startY = 100;
  let width = 250;
  let height = 250;
  let gridSize = 5;

  //   let density = 0.55; // Probability of drawing a dot in each cell

  for (let x = startX; x < startX + width; x += gridSize) {
    for (let y = startY; y < startY + height; y += gridSize) {
      let dotSize = random(0.1, 1);
      if (random() < density) {
        let rand = noise(xT, yT) * 10;
        // ellipse(x + random(-2, 2), y + random(-2, 2), dotSize);
        ellipse(y + rand * 10, x + rand * 10, dotSize);
      }

      yT += 0.01;
    }
    xT += 0.01;
  }
}

function setup() {
  createCanvas(size, size);
  background("black");

  dotting("white", 0.75);
  dottingVert("red", 0.86);
  dotting("white", 0.75);

  dottingVert("red", 0.86);
}
