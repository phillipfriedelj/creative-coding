let width = 750;
let height = 1000;
spacing = 5;
function addNoise() {
  // Load the pixels array.
  loadPixels();

  // Copy the top half of the canvas to the bottom.
  for (let i = 0; i < pixels.length; i += 4) {
    // Red.
    pixels[i] += random(-25, 25);
    // Green.
    pixels[i + 1] += random(-25, 25);
    // Blue.
    pixels[i + 2] += random(-25, 25);
    // Alpha.
    pixels[i + 3] += random(-25, 25);
  }

  updatePixels();
}

function setup() {
  createCanvas(width, height);
  noStroke();
  background("#f8d6cc");

  fill("#e77b7b");
  rect(width / 3, 0, width, height);

  noStroke();
  fill("#f8d6cc");
  circle((width / 3) * 2, height / 2, (width / 3) * 2 - 75);

  fill("rgba(217, 104, 64, 0.75)");
  circle(width / 3, (height / 3) * 2, (width / 3) * 2 - 75);

  //   addNoise();
}
