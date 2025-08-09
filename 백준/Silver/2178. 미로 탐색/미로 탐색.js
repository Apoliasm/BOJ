const { throws } = require("assert");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  _newNode(item) {
    return new Node(item);
  }

  push(item) {
    let pushNode = this._newNode(item);
    if (this.rear === null) {
      this.front = pushNode;
      this.rear = pushNode;
    } else {
      this.rear.next = pushNode;
    }
    this.rear = pushNode;
    this.length += 1;
  }

  pop() {
    if (!this.front) {
      return null;
    }
    let popNode = this.front;
    this.length -= 1;
    if (this.length === 0) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    return popNode.item;
  }
}

let n = 0,
  m = 0,
  lineCount = 0,
  rowCount = 0;
let field = [];
let visited = [];
let depth = 0;
//상하좌우
const dirRow = [-1, 1, 0, 0];
const dirCol = [0, 0, -1, 1];

readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
    } else {
      field.push(
        line
          .trim()
          .split("")
          .map((val) => Number(val))
      );
      rowCount += 1;
      if (rowCount === n) readline.close();
    }
  })
  .on("close", () => {
    let [destRow, destCol] = [n - 1, m - 1];
    let queue = new Queue();
    visited = Array.from({ length: n }, (row) => {
      return Array(m).fill(false);
    });
    queue.push([0, 0]);
    bfs();
    console.log(depth);

    function bfs() {
      while (queue.length != 0) {
        depth += 1;
        let queueSize = queue.length;
        for (let i = 0; i < queueSize; i++) {
          let [currentRow, currentCol] = queue.pop();
          if (currentRow === destRow && currentCol === destCol) {
            return depth;
          }
          for (let dir = 0; dir < 4; dir++) {
            let [nextRow, nextCol] = [
              currentRow + dirRow[dir],
              currentCol + dirCol[dir],
            ];
            if (nextRow < 0 || nextCol < 0 || nextRow >= n || nextCol >= m) {
              continue;
            }
            if (visited[nextRow][nextCol]) {
              continue;
            }
            if (field[nextRow][nextCol] === 0) {
              continue;
            }
            visited[nextRow][nextCol] = true;
            queue.push([nextRow, nextCol]);
          }
        }
      }
      return depth;
    }
  });
