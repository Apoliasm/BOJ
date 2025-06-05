const { Dir } = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const field = [];
let n = 0;
let m = 0;
let startRow = 0;
let startCol = 0;
let startDirIndex = 0;
let lineCount = 0;
let rowCount = 0;
class Direction {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}
//북 동 남 서
const directions = [
  new Direction(-1, 0),
  new Direction(0, 1),
  new Direction(1, 0),
  new Direction(0, -1),
];
//후진 방향
const rearDirections = [2, 3, 0, 1];
//북 -> 서 -> 남 -> 동
const nextDirections = [3, 0, 1, 2];
class Element {
  constructor(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
  }
}
// class Node {
//   constructor(element) {
//     this.element = element;
//     this.next = null;
//   }
// }
// class Queue {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.length = 0;
//   }
//   push(element) {
//     let newNode = new Node(element);
//     if (this.head === null) {
//       this.head = newNode;
//       this.tail = newNode;
//     } else {
//       this.tail.next = newNode;
//     }
//     this.length += 1;
//   }
//   pop() {
//     if (this.head === null) {
//       return null;
//     } else {
//       let front = this.head.element;
//       this.head = this.head.next;
//       this.length -= 1;
//       return front;
//     }
//   }
//   size() {
//     return this.length;
//   }
//   clear() {
//     this.head = null;
//     this.tail = null;
//     this.length = 0;
//   }
// }

readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((element) => Number(element));
      lineCount += 1;
    } else if (lineCount === 1) {
      [startRow, startCol, startDirIndex] = line
        .trim()
        .split(" ")
        .map((element) => Number(element));
      lineCount += 1;
    } else {
      const row = line
        .trim()
        .split(" ")
        .map((element, colCount) => {
          let parsedInt = Number(element);
          return new Element(rowCount, colCount, parsedInt);
        });
      field.push(row);
      rowCount += 1;
      if (rowCount === n) {
        readline.close();
      }
    }
  })
  .on("close", () => {
    // let queue = new Queue();
    let cleaned = 0;
    // queue.push([field[startRow][startCol], startDirIndex]);
    let nextElement = field[startRow][startCol];
    let nextDirIndex = startDirIndex;
    while (nextElement !== null) {
      //1. 현재 칸 청소
      let [currentRow, currentCol, currentDirIndex] = [
        nextElement.row,
        nextElement.col,
        nextDirIndex,
      ];

      if (field[currentRow][currentCol].value === 0) {
        field[currentRow][currentCol].value = 2;
        cleaned += 1;
      }
      nextElement = null;
      //2. 현재 4방향 탐색
      for (let dir = 0; dir < 4; dir++) {
        nextDirIndex = nextDirections[nextDirIndex];
        let nextDir = directions[nextDirIndex];
        let [nextRow, nextCol] = [
          currentRow + nextDir.row,
          currentCol + nextDir.col,
        ];

        if (!isValid(nextRow, nextCol)) {
          continue;
        }
        if (field[nextRow][nextCol].value === 0) {
          nextElement = field[nextRow][nextCol];
          break;
        }
      }
      //3.갈 곳이 없다면 후진할 타이밍
      if (nextElement === null) {
        let rearDirIndex = rearDirections[currentDirIndex];
        let rearDir = directions[rearDirIndex];
        let [rearRow, rearCol] = [
          currentRow + rearDir.row,
          currentCol + rearDir.col,
        ];
        if (!isValid(rearRow, rearCol)) {
          continue;
        }
        let rearElement = field[rearRow][rearCol];
        if (rearElement.value !== 1) {
          nextElement = rearElement;
        }
      }
      //4.그럼에도 다음 실행할 게 없다면 리턴
    }
    console.log(cleaned);

    function isValid(row, col) {
      if (row < 0 || col < 0 || row >= n || col >= m) {
        return false;
      }
      return true;
    }
  });
//반시계 90도 북 -> 서 -> 남 -> 동
// 0-3-2-1-0
//반드시 뒷 칸은 청소되어 있음
