const size = 1000;
let steps;

let slider;
let oldSliderValue;

let counter = 0;

function drawQuadraticVertex(startX, startY, endX, endY, anchorX, anchorY) {
  //   fill("white");
  beginShape();
  //   stroke("rgba(0%, 0%, 100%, 0.75)");

  vertex(startX, startY);
  quadraticVertex(anchorX, anchorY, endX, endY);
  endShape();
}

function drawBezierLine(
  startX,
  startY,
  endX,
  endY,
  anchor1X,
  anchor1Y,
  anchor2X,
  anchor2Y
) {
  beginShape();
  //   stroke("rgba(100%, 0%, 0%, 0.75)");
  vertex(startX, startY);
  bezierVertex(anchor1X, anchor1Y, anchor2X, anchor2Y, endX, endY);
  endShape();
}

function drawTile(x, y, width, height) {
  strokeWeight(1);
  let direction = random() >= 0.5 ? "left" : "right";

  noFill();
  beginShape();

  let startPointX;
  let startPointY;
  let bezPointX1;
  let bezPointX2;
  let bezPointY1;
  let bezPointY2;
  let endPointX;
  let endPointY;

  // let h = map(counter, 0, steps * steps, 220, 250);
  // console.log("COUNT :: ", counter, " -- H: ", h);
  // console.log("X * Y - ", x * y);
  stroke(0, 0, 0);
  // stroke(randColor);
  //   stroke("blue");

  if (direction === "left") {
    startPointX = x * width;
    startPointY = y * height;
    let startX = x * width;
    let endX = (x + 1) * width;
    let startY = y * height;
    let endY = (y + 1) * height;
    bezPointX1 = random(startX, endX);
    bezPointY1 = random(startY, endY);
    bezPointX2 = random(startX, endX);
    bezPointY2 = random(startY, endY);
    endPointX = startPointX + width;
    endPointY = startPointY + height;

    // drawQuadraticVertex(
    //   startPointX,
    //   startPointY,
    //   endPointX,
    //   endPointY,
    //   bezPointX1,
    //   bezPointY1
    // );

    drawBezierLine(
      startPointX,
      startPointY,
      endPointX,
      endPointY,
      bezPointX1,
      bezPointY1,
      bezPointX2,
      bezPointY2
    );
  } else {
    startPointX = x * width + width;
    startPointY = y * height;
    let startX = x * width;
    let endX = (x + 1) * width;
    let startY = y * height;
    let endY = (y + 1) * height;
    bezPointX1 = random(startX, endX);
    bezPointY1 = random(startY, endY);
    bezPointX2 = random(startX, endX);
    bezPointY2 = random(startY, endY);
    endPointX = startPointX - width;
    endPointY = startPointY + height;

    drawBezierLine(
      startPointX,
      startPointY,
      endPointX,
      endPointY,
      bezPointX1,
      bezPointY1,
      bezPointX2,
      bezPointY2
    );

    // drawQuadraticVertex(
    //   startPointX,
    //   startPointY,
    //   endPointX,
    //   endPointY,
    //   bezPointX1,
    //   bezPointY1
    // );
  }

  //   stroke("black");
  //   line(x + width, y, x, y + height);

  //   stroke("red");
  //   point(startPointX, startPointY);
  //   point(endPointX, endPointY);
  //   stroke("green");
  //   strokeWeight(10);
  //   point(bezPointX, bezPointY);
  counter++;
}

function setup() {
  colorMode(HSL);
  createCanvas(size, size);
  background("white");
  stroke("white");
  strokeWeight(3);

  //   slider = createSlider(3, 100, 20, 1);
  //   slider.position(10, 10);
  //   slider.size(80);

  //   step = slider.value();
  //   steps = random(10, 150);
  steps = 150;
  stepSizeX = width / steps;
  stepSizeY = height / steps;

  //   let colors = colorPalettes[floor(random(0, colorPalettes.length))];
  //   let colors = ["#00072d", "#001c55", "#0a2472", "#0e6ba8", "#a6e1fa"];
  //   let colors = ["#250902", "#38040e", "#640d14", "#800e13", "#ad2831"];
  //   let colors = ["#e5d9f2", "#f5efff", "#cdc1ff", "#a594f9", "#7371fc"];
  let colors = ["#f08080", "#f4978e", "#f8ad9d", "#fbc4ab", "#ffdab9"];
  console.log("COLORS ", colors);

  for (let x = 0; x < steps; x++) {
    for (let y = 0; y < steps; y++) {
      drawTile(x, y, stepSizeX, stepSizeY, colors);
    }
  }

  console.log("COUNTER :: ", counter);
}
