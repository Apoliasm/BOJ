const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Dice {
  constructor() {
    this.dice = Array(7).fill(0);
    this.current = [1, 3, 4, 2, 5, 6];
  }

  move(dir) {
    let [floor, east, west, north, south, ceil] = this.current;
    switch (dir) {
      case 1:
        this.current = [east, ceil, floor, north, south, west];
        break;
      case 2:
        this.current = [west, floor, ceil, north, south, east];
        break;
      case 3:
        this.current = [north, east, west, ceil, floor, south];
        break;
      case 4:
        this.current = [south, east, west, floor, ceil, north];
        break;
    }
  }
}
let n = 0,
  m = 0,
  x = 0,
  y = 0,
  k = 0;
lineCount = 0;
nCount = 0;
let field = [];
let cmds = [];
const dice = new Dice();
const dirRow = [0, 0, 0, -1, 1];
const dirCol = [0, 1, -1, 0, 0];
let answers = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m, x, y, k] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      field = Array.from({ length: n }, (_) => []);
      lineCount += 1;
    } else if (lineCount === 1 && nCount !== n) {
      field[nCount] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      nCount += 1;
    } else {
      cmds = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      readline.close();
    }
  })
  .on("close", () => {
    //방향대로 움직이고, 바닥이 향하는 주사위 방향 리턴
    for (let dir of cmds) {
      let [nextRow, nextCol] = [x + dirRow[dir], y + dirCol[dir]];
      if (!isMovable(nextRow, nextCol)) continue;
      [x, y] = [nextRow, nextCol];
      dice.move(dir);
      let currentField = field[x][y];
      let currentFloor = dice.current[0];
      let currentCeil = dice.current[5];
      if (currentField === 0) {
        field[x][y] = dice.dice[currentFloor];
      } else {
        dice.dice[currentFloor] = currentField;
        field[x][y] = 0;
      }
      answers.push(dice.dice[currentCeil]);
    }

    console.log(answers.join("\n"));

    function isMovable(nextRow, nextCol) {
      if (nextRow < 0 || nextCol < 0 || nextRow >= n || nextCol >= m)
        return false;
      return true;
    }
  });
