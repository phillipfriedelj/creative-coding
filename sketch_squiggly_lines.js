let size = 400;

const width = 400;
const height = 400;
const lineSegments = 50;
const increment = 5;

var lines = [];
var xt = 0;
var yt = 0;

function generatePoints() {
  const scalingFactorX = random(0.00002, 0.0001);
  const segmentWidth = width / lineSegments;
  for (var y = segmentWidth; y <= height - segmentWidth; y += increment) {
    var line = [];
    for (var x = segmentWidth; x <= width - segmentWidth; x += segmentWidth) {
      let nX = random(0, 1);
      line.push({ x: x, y: y + nX * x * y * scalingFactorX });
      xt += 0.01;
    }
    xt = 0;
    lines.push(line);
  }
}

function drawPoints() {
  fill("red");
  for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[i].length; j++) {
      const { x, y } = lines[i][j];
      circle(x, y, 1);
    }
  }
}

function drawLines() {
  for (var i = 0; i < lines.length; i++) {
    //beginShape()
    for (var j = 0; j < lines[i].length - 1; j++) {
      const { x, y } = lines[i][j];
      const { x: endX, y: endY } = lines[i][j + 1];
      line(x, y, endX, endY);
      //vertex(x, y)
    }

    //vertex(width, height)
    //vertex(0, height)
    //endShape(CLOSE)
  }
}

function setup() {
  createCanvas(width, height);
  background("beige");
  generatePoints();
  //drawPoints()
  drawLines();
}

function draw() {}
