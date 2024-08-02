let size = 1250;
let step = 1;

let slider;
let oldSliderValue;

function drawBezierLine(x, y, width, height) {
  let direction = random() >= 0.5 ? "left" : "right";
  //console.log("DIRE :: ", direction)

  if (direction === "left") {
    line(x, y, x + width, y + height);
    //console.log("L-FROM: ", x, "|", y, " TO: ", x + width, "|", y + height)
  } else {
    line(x + width, y, x, y + height);
    //console.log("R-FROM: ", x + width, "|", y, " TO: ", x, "|", y + height)
  }
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

  step = slider.value();
  for (let x = 0; x < size; x += step) {
    for (let y = 0; y < size; y += step) {
      drawBezierLine(x, y, step, step);
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
