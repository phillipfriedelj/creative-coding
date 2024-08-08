let size = 600;
let step = 1;

let slider;
let oldSliderValue;

function pencilLine(x1, y1, x2, y2, lineWeight, density = 0.8) {
  let steps = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let perpAngle = angle + HALF_PI;

  // Draw the main solid line
  strokeWeight(strokeWeight - 2);
  line(x1, y1, x2, y2);

  // Draw the pencil effect on the edges
  strokeWeight(1);
  for (let offset = -lineWeight / 2; offset <= lineWeight / 2; offset += 1) {
    if (abs(offset) < lineWeight / 2 - 1) continue; // Skip inner part

    let startX = x1 + cos(perpAngle) * offset;
    let startY = y1 + sin(perpAngle) * offset;

    for (let i = 0; i <= steps; i++) {
      if (random() < density) {
        let t = i / steps;
        let x = lerp(startX, x2 + cos(perpAngle) * offset, t);
        let y = lerp(startY, y2 + sin(perpAngle) * offset, t);
        point(x, y);
      }
    }
  }
}

function drawBezierLine(x, y, width, height) {
  let direction = random() >= 0.5 ? "left" : "right";
  //console.log("DIRE :: ", direction)

  if (direction === "left") {
    pencilLine(x, y, x + width, y + height, 2, 0.8);
    // line(x, y, x + width, y + height);
    //console.log("L-FROM: ", x, "|", y, " TO: ", x + width, "|", y + height)
  } else {
    pencilLine(x + width, y, x, y + height, 2, 0.8);
    // line(x + width, y, x, y + height);
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

  // slider = createSlider(3, 100, 20, 1);
  // slider.position(10, 10);
  // slider.size(80);

  // step = slider.value();
  step = 100;
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
