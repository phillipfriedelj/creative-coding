const size = 1000;
let step = 1;

let slider;
let oldSliderValue;

function drawBezierLine(x, y, width, height) {
  console.log("BL -- X: ", x, " -- Y: ", y);

  strokeWeight(1);
  let direction = random() >= 0.5 ? "left" : "right";
  //console.log("DIRE :: ", direction)

  noFill();
  // Draw the curve.
  beginShape();

  //   vertex(x, y);
  let startPointX;
  let startPointY;
  let bezPointX;
  let bezPointY;
  let endPointX;
  let endPointY;

  //   quadraticVertex(endPointX, endPointY, bezPointX, bezPointY);
  //   vertex(endPointX, endPointY);
  stroke("blue");

  if (direction === "left") {
    startPointX = x * width;
    startPointY = y * height;
    let xStart = x * width;
    let xEnd = (x + 1) * width;
    let yStart = y * height;
    let yEnd = (y + 1) * height;
    bezPointX = random(xStart, xEnd);
    bezPointY = random(yStart, yEnd);
    endPointX = startPointX + width;
    endPointY = startPointY + height;

    console.log("X::START  --", xStart, " -- ", xEnd);
    console.log("Y::START  --", yStart, " -- ", yEnd);
    //   console.log("BEZ POINT --", bezPointX, "|", bezPointY);

    vertex(startPointX, startPointY);
    //   vertex(endPointX, endPointY);
    quadraticVertex(bezPointX, bezPointY, endPointX, endPointY);
    // startPointX = x;
    // startPointY = y;
    // bezPointX = (x + 1) * width;
    // bezPointY = (y + 1) * (height / 2);
    // endPointX = x + width;
    // endPointY = y + height;

    // vertex(x, y);
    // // vertex(endPointX, endPointY);
    // quadraticVertex(bezPointX, bezPointY, endPointX, endPointY);
  } else {
    startPointX = x * width;
    startPointY = y * height + height;
    let xStart = x * width;
    let xEnd = (x + 1) * width;
    let yStart = y * height;
    let yEnd = (y + 1) * height;
    bezPointX = random(xStart, xEnd);
    bezPointY = random(yStart, yEnd);
    endPointX = startPointX + width;
    endPointY = y * height;

    console.log("X::START  --", xStart, " -- ", xEnd);
    console.log("Y::START  --", yStart, " -- ", yEnd);
    //   console.log("BEZ POINT --", bezPointX, "|", bezPointY);

    vertex(startPointX, startPointY);
    //   vertex(endPointX, endPointY);
    quadraticVertex(bezPointX, bezPointY, endPointX, endPointY);

    // startPointX = x;
    // startPointY = y + height;
    // bezPointX = width / 2;
    // bezPointY = y;
    // endPointX = x + width;
    // endPointY = y;

    // vertex(startPointX, startPointY);
    // // vertex(endPointX, endPointY);
    // quadraticVertex(bezPointX, bezPointY, endPointX, endPointY);
    // // quadraticVertex(random(x, x + width), random(y, y + height), x, y);
  }
  endShape();
  //   stroke("black");
  //   line(x + width, y, x, y + height);

  //   stroke("red");
  //   point(startPointX, startPointY);
  //   point(endPointX, endPointY);
  //   stroke("green");
  //   strokeWeight(10);
  //   point(bezPointX, bezPointY);
}

function drawRect(x, y, width, height) {
  let direction = random() >= 0.5 ? "left" : "right";
  //console.log("DIRE :: ", direction)

  if (direction === "left") {
    rect(x + width, y + height, x + width, y + height);
    //console.log("L-FROM: ", x, "|", y, " TO: ", x + width, "|", y + height)
  } else {
    rect(x + width, y, x, y + height);
    //console.log("R-FROM: ", x + width, "|", y, " TO: ", x, "|", y + height)
  }
}

function setup() {
  createCanvas(size, size);
  background("#aec4e6");
  stroke("white");
  strokeWeight(3);

  slider = createSlider(3, 100, 20, 1);
  slider.position(10, 10);
  slider.size(80);

  //   step = slider.value();
  steps = 50;
  stepSizeX = width / steps;
  stepSizeY = height / steps;

  for (let x = 0; x < steps; x++) {
    for (let y = 0; y < steps; y++) {
      console.log("X: ", x, " | Y: ", y);
      drawBezierLine(x, y, stepSizeX, stepSizeY);
    }
  }
}

function draw() {
  /*
  step = slider.value();
  if(!oldSliderValue || oldSliderValue !== slider.value()) {
    background("#aec4e6");
    oldSliderValue = slider.value();
    for(let x=0; x<size; x += step) {
      for(let y=0; y<size; y += step) {
       //drawLine(x, y, step, step) 
        drawRect(x,y,step,step)
      }
    }
  }
  */
}
