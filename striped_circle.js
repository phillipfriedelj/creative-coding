const size = 1000;

function drawStripedCircle() {
  let border = 50;
  let reduction = 10;
  let layers = 150;

  let middle = Math.ceil(layers / 2 + 1);
  //   let height = size / layers;
  let height = 5;
  let fullWidth = size - 2 * border;

  let startWidth = 10;
  //   let startWidth = fullWidth - reduction * Math.floor(layers / 2);
  let startSpacing = (fullWidth - startWidth) / 2;

  for (let layer = 1; layer < Math.floor(layers / 2); layer++) {
    line(
      border + startSpacing,
      layer * height,
      border + startSpacing + startWidth,
      layer * height
    );
    startWidth += reduction;
    startSpacing = (fullWidth - startWidth) / 2;
  }

  //   line(0, middle * height, fullWidth, middle * height);

  for (let layer = Math.floor(layers / 2); layer < layers; layer++) {
    line(
      border + startSpacing,
      layer * height,
      border + startSpacing + startWidth,
      layer * height
    );
    startWidth -= reduction;
    startSpacing = (fullWidth - startWidth) / 2;
  }
  //   for (let layer = 1; layer <= layers; layer++) {
  //     console.log("LAYWR :: ", layer, " -- MIDD :: ", middle);
  //     if (dir === 1) {
  //       let space = (size - 2 * border - lineWidth) / 2;
  //       console.log("SPACE -- ", space);
  //       line(
  //         border + space,
  //         layer * height,
  //         size - border - space,
  //         layer * height
  //       );
  //     }

  //     if (layer === middle) {
  //       line(border, layer * height, size - border, layer * height);
  //       dir = -1;
  //     }
  //   }
  // for (let y = 0; y < size; y++) {
  //   for (let x = 0; x < size; x++) {}
  // }
}

function setup() {
  createCanvas(size, size);
  background("#f5ebe0");
  stroke("white");
  strokeWeight(3);

  drawStripedCircle();
}
