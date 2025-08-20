const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
  }

  clear() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
  }

  length() {
    return this.tail - this.head;
  }
  push(item) {
    this.queue.push(item);
    this.tail += 1;
  }
  pop() {
    return this.queue[this.head++];
  }
}

let lineCount = 0,
  n = 0,
  nCount = 0;
let field = [];
let visited = [];
let babySharkSize = 2;
//상하좌우
let dirRow = [0, 0, -1, 1];
let dirCol = [1, -1, 0, 0];
let foodCandidates = [];
let queue = new Queue();
let foods = 0;
let answer = 0;
let sec = 0;
let eatCount = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      visited = Array.from({ length: n }, (row) => {
        return Array(n).fill(false);
      });
      lineCount += 1;
    } else {
      field.push(
        line
          .trim()
          .split(" ")
          .map((val, colCount) => {
            let num = Number(val);
            if (num === 9) {
              queue.push({ row: nCount, col: colCount });
              num = 0;
              visited[nCount][colCount] = true;
            } else if (num !== 0) {
              foods += 1;
            }
            return num;
          })
      );
      nCount += 1;
      if (nCount === n) readline.close();
    }
  })
  .on("close", () => {
    while (foods !== 0) {
      let nextFood = findFoods();
      if (!nextFood) {
        break;
      }
      queue.clear();
      queue.push(nextFood);
    }
    console.log(answer);

    function findFoods() {
      sec = 0;
      initVisit();
      while (queue.length() !== 0) {
        sec += 1;
        let qlength = queue.length();
        for (let i = 0; i < qlength; i++) {
          let poped = queue.pop();
          let [row, col] = [poped.row, poped.col];
          visited[row][col] = true;
          for (let dir = 0; dir < 4; dir++) {
            let nextRow = row + dirRow[dir];
            let nextCol = col + dirCol[dir];
            let next = { row: nextRow, col: nextCol };
            if (nextRow < 0 || nextCol < 0 || nextRow >= n || nextCol >= n) {
              continue;
            }
            if (visited[nextRow][nextCol]) {
              continue;
            }
            if (field[nextRow][nextCol] > babySharkSize) {
              continue;
            }
            if (
              field[nextRow][nextCol] === babySharkSize ||
              field[nextRow][nextCol] === 0
            ) {
              queue.push(next);
              visited[nextRow][nextCol] = true;
            } else if (field[nextRow][nextCol] < babySharkSize) {
              foodCandidates.push(next);
              visited[nextRow][nextCol] = true;
            }
          }
        }
        if (foodCandidates.length === 0) {
          continue;
        }
        foodCandidates.sort((a, b) => {
          if (a.row !== b.row) {
            return a.row - b.row;
          } else {
            return a.col - b.col;
          }
        });
        let nextFood = foodCandidates[0];
        field[nextFood.row][nextFood.col] = 0;
        foodCandidates = [];
        eatCount += 1;
        if (eatCount === babySharkSize) {
          babySharkSize += 1;
          eatCount = 0;
        }
        answer += sec;
        foods -= 1;
        return nextFood;
      }
      return null;
    }
  });

function initVisit() {
  visited.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => (visited[rowIndex][colIndex] = false));
  });
}
/**
 *
 * 0. 먹잇감이 있는지부터 체크,없으면 바로 끝내면 된다.
 * 1. 가장 가까운 먹이감을 찾는다.
 * 2. 이 가까운 것이라는 최단거리
 * 이 최단거리를 ...
 * 먹이 찾고 길이 계산, bfs로 최단 거리마다 큐에 넣고 계산?
 * O(nn) + 길이 계산O(nn) / 길이 계산만O(nn+e) 결국 bfs 과정이 포함됨
 * 3. 동점자 처리
 *
 */
