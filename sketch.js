let symbolSize = 26;
let streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }

  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach((stream) => {
    stream.render();
  });
}

class Symbol {
  switchInterval = round(random(2, 20));

  constructor(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;
  }

  setToRandomSymbol() {
    if (frameCount % this.switchInterval == 0) {
      let char = 4608 + round(random(0, 415));
      this.value = String.fromCharCode(char);
    }
  }

  rain() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}

class Stream {
  symbols = [];
  totalSymbols = round(random(5, 30));
  speed = random(5, 20);

  generateSymbols(x, y) {
    let first = round(random(0, 4)) == 1;
    for (let i = 0; i <= this.totalSymbols; i++) {
      let symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  render() {
    this.symbols.forEach((symbol) => {
      if (symbol.first) {
        fill(180, 255, 180);
      } else {
        fill(0, 255, 70);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }

}