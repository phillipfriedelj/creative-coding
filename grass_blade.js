let size = 600;

function setup() {
  colorMode(HSL);
  createCanvas(size, size);
  background("wheat");

  beginShape();
  vertex(200, size);

  strokeWeight(5);
  stroke("red");
  let pointX = 200;
  let pointY = 300;
  point(pointX, pointY);

  stroke("black");
  strokeWeight(1);
  quadraticVertex(pointX, pointY, 275, 475);

  strokeWeight(5);
  stroke("red");
  point(375, 300);

  stroke("black");
  strokeWeight(1);
  quadraticVertex(pointX + 25, pointY, 225, size);

  endShape();
}
