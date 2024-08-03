let w = window.innerWidth - 20;
let h = window.innerHeight - 20;
const divisionSteps = 100;
const minSize = 15;

let colorPalettes = [
  ["#ccd5ae", "#e9edc9", "#faedcd", "#d4a373"],
  ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
  ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
  ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482"],
  [
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#e9d8a6",
    "#ee9b00",
    "#ca6702",
    "#bb3e03",
    "#ae2012",
    "#9b2226",
  ],
  ["#00072d", "#001c55", "#0a2472", "#0e6ba8", "#a6e1fa"],
  ["#250902", "#38040e", "#640d14", "#800e13", "#ad2831"],
  ["#e5d9f2", "#f5efff", "#cdc1ff", "#a594f9", "#7371fc"],
  ["#f08080", "#f4978e", "#f8ad9d", "#fbc4ab", "#ffdab9"],
  [
    "#d9ed92",
    "#b5e48c",
    "#99d98c",
    "#76c893",
    "#52b69a",
    "#34a0a4",
    "#168aad",
    "#1a759f",
    "#1e6091",
    "#184e77",
  ],
  ["#e07a5f", "#3d405b", "#81b29a", "#f2cc8f"],
  [
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#e9d8a6",
    "#ee9b00",
    "#ca6702",
    "#bb3e03",
    "#ae2012",
    "#9b2226",
  ],
  ["#390099", "#9e0059", "#ff0054", "#ff5400", "#ffbd00"],
  [
    "#03071e",
    "#370617",
    "#6a040f",
    "#9d0208",
    "#d00000",
    "#dc2f02",
    "#e85d04",
    "#f48c06",
    "#faa307",
    "#ffba08",
  ],
  ["#233d4d", "#fe7f2d", "#fcca46", "#a1c181", "#619b8a"],
  ["#f7b267", "#f79d65", "#f4845f", "#f27059", "#f25c54"],
  ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"],
  ["#335c67", "#fff3b0", "#e09f3e", "#9e2a2b", "#540b0e"],
  ["#001427", "#708d81", "#f4d58d", "#bf0603", "#8d0801"],
  [
    "#004b23",
    "#006400",
    "#007200",
    "#008000",
    "#38b000",
    "#70e000",
    "#9ef01a",
    "#ccff33",
  ],
  ["#355070", "#6d597a", "#b56576", "#e56b6f", "#eaac8b"],
];

class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(color) {
    // stroke("black");
    fill(color);
    rect(this.x, this.y, this.width, this.height);
  }
}

function subdivideRect(rect) {
  let subdivideChance = map(rect.width * rect.height, 0, w * h, 0.1, 0.9);
  if (
    random() > subdivideChance ||
    rect.width < minSize ||
    rect.height < minSize
  ) {
    return [rect];
  }

  let rectOne, rectTwo;
  let breakPoint;
  let dir = rect.width > rect.height ? "width" : "height";

  if (dir === "height" && rect.height >= minSize) {
    breakPoint = rect.y + Math.random() * (rect.height - minSize) + minSize / 2;
    rectOne = new Rectangle(
      rect.x,
      rect.y,
      rect.width,
      breakPoint - rect.y,
      "red"
    );
    rectTwo = new Rectangle(
      rect.x,
      breakPoint,
      rect.width,
      rect.y + rect.height - breakPoint,
      "red"
    );
  } else if (dir === "width" && rect.width >= minSize) {
    breakPoint = rect.x + Math.random() * (rect.width - minSize) + minSize / 2;
    rectOne = new Rectangle(
      rect.x,
      rect.y,
      breakPoint - rect.x,
      rect.height,
      "red"
    );
    rectTwo = new Rectangle(
      breakPoint,
      rect.y,
      rect.x + rect.width - breakPoint,
      rect.height,
      "red"
    );
  } else {
    return [rect];
  }

  return [...subdivideRect(rectOne), ...subdivideRect(rectTwo)];
}

function subdivideRectArray(rects) {
  let newRects = [];
  for (let rect of rects) {
    newRects.push(...subdivideRect(rect));
  }
  return newRects;
}

function setup() {
  createCanvas(w, h);
  background("#f5ebe0");
  // stroke("white");
  // strokeWeight(3);

  let rects = [];
  rects.push(new Rectangle(0, 0, w, h, "red"));

  for (let step = 0; step < divisionSteps; step++) {
    rects = subdivideRectArray(rects);
  }

  let r = Math.floor(random(colorPalettes.length - 1));
  let palette = colorPalettes[r];

  for (let i = 0; i < rects.length; i++) {
    // console.log("RECT :: ", rects[i]);
    rects[i].draw(palette[Math.floor(random(palette.length - 1))]);
  }
}
