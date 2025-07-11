const { read } = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let row = 0,
  col = 0;
let board = [];
let lineCount = 0;
let rowCount = 0;
let answer = 0;
let drow = [0, 0, -1, 1];
let dcol = [-1, 1, 0, 0];

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    let newNode = new Node(item);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }
  pop() {
    if (this.length === 0 || this.head === null) {
      return null;
    } else {
      let toPop = this.head;
      this.head = this.head.next;
      this.length -= 1;
      return toPop.item;
    }
  }
  front() {
    return this.head.item;
  }
  isEmpty() {
    if (this.length === 0) {
      return true;
    }
    return false;
  }
}
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [row, col] = line
        .trim()
        .split(" ")
        .map((value) => Number(value));
      board = Array.from({ length: row }, () => {
        return [];
      });
      lineCount += 1;
    } else {
      board[rowCount] = line.trim().split("");
      rowCount += 1;
      if (rowCount === row) {
        readline.close();
      }
    }
  })
  .on("close", () => {
    let queue = new Queue();
    //알파벳 순
    let visited = Array(26).fill(false);
    visited[getCharIndex(board[0][0])] = true;
    dfs(0, 0, 1);
    console.log(answer);

    function dfs(currentRow, currentCol, depth) {
      for (let i = 0; i < 4; i++) {
        let nextRow = currentRow + drow[i];
        let nextCol = currentCol + dcol[i];
        if (nextRow >= row || nextCol >= col || nextCol < 0 || nextRow < 0) {
          continue;
        }
        let nextChar = board[nextRow][nextCol];
        let nextIndex = getCharIndex(nextChar);
        if (visited[nextIndex] === false) {
          visited[nextIndex] = true;
          dfs(nextRow, nextCol, depth + 1);
          visited[nextIndex] = false;
        }
      }
      answer = Math.max(answer, depth);
    }
    function bfs() {
      queue.push({ r: 0, c: 0 });
      while (!queue.isEmpty()) {
        answer += 1;
        let front = queue.pop();
        let [r, c] = [front.r, front.c];
        let charIndex = getCharIndex(board[r][c]);
        visited[charIndex] = true;
        for (let i = 0; i < 4; i++) {
          let nextRow = r + drow[i];
          let nextCol = c + dcol[i];
          if (nextRow >= row || nextCol >= col || nextCol < 0 || nextRow < 0) {
            continue;
          }
          if (visited[getCharIndex(board[nextRow][nextCol])] === false) {
            queue.push({ r: nextRow, c: nextCol });
          }
        }
      }
    }

    function getCharIndex(char) {
      return char.charCodeAt(0) - "A".charCodeAt(0);
    }
  });
