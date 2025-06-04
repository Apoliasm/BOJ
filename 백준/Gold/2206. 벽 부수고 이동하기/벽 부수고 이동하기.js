const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
let m = 0;
let lineCount = 0;
const field = [];
const dirRow = [-1, 1, 0, 0];
const dirCol = [0, 0, -1, 1];

class Element {
  constructor(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.next = null;
  }
}

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(element) {
    const newNode = new Node(element);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size += 1;
  }
  pop() {
    if (this.head === null) {
      return null;
    }
    let front = this.head;
    this.head = front.next;
    this.size -= 1;
    return front.element;
  }
  getSize() {
    return this.size;
  }
}
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((element) => Number(element));
      lineCount += 1;
    } else {
      input = line
        .trim()
        .split("")
        .map((element, colIndex) => {
          const parsedInt = Number(element);
          const newNode = new Element(lineCount - 1, colIndex, parsedInt);
          return newNode;
        });
      field.push(input);

      if (lineCount === n) {
        readline.close();
      }
      lineCount += 1;
    }
  })
  .on("close", () => {
    let answer = Infinity;
    const visited = Array.from({ length: 2 }, () => {
      return Array.from({ length: n }, () => {
        return Array(m).fill(false);
      });
    });
    const queue = new Queue();
    queue.push([0, field[0][0]]);
    visited[0][0][0] = true;
    bfs();
    console.log(answer === Infinity ? -1 : answer);

    function bfs() {
      depth = 1;
      while (queue.getSize() !== 0) {
        let length = queue.getSize();
        for (let l = 0; l < length; l++) {
          let poped = queue.pop();
          let [broken, currentRow, currentCol] = [
            poped[0],
            poped[1].row,
            poped[1].col,
          ];
          if (currentRow === n - 1 && currentCol === m - 1) {
            answer = depth;
            return;
          }

          for (let dir = 0; dir < 4; dir++) {
            let nextRow = currentRow + dirRow[dir];
            let nextCol = currentCol + dirCol[dir];

            if (!isValid(nextRow, nextCol)) {
              continue;
            }
            if (
              !isZero(nextRow, nextCol) &&
              broken === 0 &&
              !isVisited(broken, nextRow, nextCol)
            ) {
              queue.push([1, field[nextRow][nextCol]]);
              visited[1][nextRow][nextCol] = true;
            }

            if (
              isZero(nextRow, nextCol) &&
              !isVisited(broken, nextRow, nextCol)
            ) {
              queue.push([broken, field[nextRow][nextCol]]);
              visited[broken][nextRow][nextCol] = true;
            }
          }
        }
        depth += 1;
      }
      return;

      function isValid(row, col) {
        if (row < n && col < m && row >= 0 && col >= 0) {
          return true;
        }
        return false;
      }
      function isVisited(broken, row, col) {
        return visited[broken][row][col];
      }
      function isZero(row, col) {
        if (field[row][col].value === 0) {
          return true;
        }
        return false;
      }
    }
  });
