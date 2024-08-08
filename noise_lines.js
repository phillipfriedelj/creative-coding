let size = 600;
let margin = 10;
const colors = ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482"];

let tx = 0;
let ty = 0;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function drawNoiseLines() {
  let noiseScale = 0.01; // Controls the smoothness of the noise
  let displacementAmount = 5; // Controls how far points can move

  for (let x = margin; x < size - margin; x += 3) {
    let line = [];
    for (let y = margin; y < size - margin; y += 3) {
      //   let rand = noise(tx, ty) * 10;
      let noiseOffsetX = random(1000); // Add these lines
      let noiseOffsetY = random(1000);
      let noiseX = noise(
        x * noiseScale + noiseOffsetX,
        y * noiseScale + noiseOffsetY
      );
      let noiseY = noise(
        y * noiseScale + noiseOffsetX,
        x * noiseScale + noiseOffsetY
      );

      let displacedX =
        x + map(noiseX, 0, 1, -displacementAmount, displacementAmount);
      let displacedY =
        y + map(noiseY, 0, 1, -displacementAmount, displacementAmount);

      line.push(new Point(displacedX, displacedY));

      tx += 0.01;
    }

    // console.log("PS :: ", line);

    stroke("black");
    strokeWeight(2);
    noFill();
    beginShape();

    for (let i = 0; i < line.length; i++) {
      //   console.log("P-", line[i].x, line[i].y);
      //   console.log("P: ", point);
      vertex(line[i].x, line[i].y);
    }
    endShape();

    ty += 0.01;
  }
}

function setup() {
  createCanvas(size, size);
  let randomColor = colors[floor(random(colors.length))];
  background(randomColor);

  drawNoiseLines();
}
