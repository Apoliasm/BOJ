const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let field = Array.from({ length: 9 }, (_) => {
  return Array(9).fill(0);
});
let n = 0,
  rowCount = 0;
let zeros = [];
let answer = [];
readline
  .on("line", (line) => {
    if (rowCount < 9) {
      field[rowCount] = line
        .trim()
        .split(" ")
        .map((val, index) => {
          let [row, col] = [rowCount, index];
          if (Number(val) === 0) {
            zeros.push({ row: row, col: col });
          }
          return Number(val);
        });
      rowCount += 1;
      if (rowCount === 9) readline.close();
    }
  })
  .on("close", () => {
    let solved = false;
    tracking(0);
    answer.forEach((row) => {
      console.log(row.join(" "));
    });
    function tracking(i) {
      if (solved) return;
      if (i === zeros.length) {
        answer = field.map((row) => [...row]);
        solved = true;
        return;
      }
      let [row, col] = [zeros[i].row, zeros[i].col];
      let ables = findAbleValues(row, col);
      for (let able of ables) {
        field[row][col] = able;
        tracking(i + 1);
        field[row][col] = 0;
      }
    }
    function findAbleValues(row, col) {
      let used = Array(10).fill(false);
      for (let i = 0; i < 9; i++) {
        used[field[row][i]] = true;
      }
      for (let i = 0; i < 9; i++) {
        used[field[i][col]] = true;
      }
      let rowSection = Math.floor(row / 3) * 3;
      let colSection = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          used[field[rowSection + i][colSection + j]] = true;
        }
      }
      let ables = [];
      for (let num = 1; num <= 9; num++) {
        if (!used[num]) ables.push(num);
      }
      return ables;
    }
  });
