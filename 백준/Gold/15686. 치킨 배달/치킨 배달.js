const { start } = require("repl");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let m = 0;
let n = 0;
let lineCount = 0;
const field = [];
const homes = [];
const chickens = [];
class Element {
  constructor(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
  }
}

readline
  .on("line", (line) => {
    if (lineCount == 0) {
      [n, m] = line.trim().split(" ").map(Number);
      lineCount += 1;
    } else if (lineCount <= n) {
      let inputRow = line
        .trim()
        .split(" ")
        .map((value, colIndex) => {
          const intValue = parseInt(value);
          const element = new Element(lineCount - 1, colIndex, intValue);
          if (intValue === 1) {
            homes.push(element);
          } else if (intValue === 2) {
            chickens.push(element);
          }
          return element;
        });
      field.push(inputRow);
      if (lineCount == n) {
        readline.close();
      } else {
        lineCount += 1;
      }
    }
  })
  .on("close", () => {
    const visited = Array.from({ length: chickens.length }, (value) => {
      return false;
    });
    let result = Infinity;
    chickendfs(0, 0);
    console.log(result);

    function chickendfs(depth, startIndex) {
      if (depth < m) {
        //모든 경우 탐색 - dfs 활용
        //인덱스가 큰 순으로만 탐색해 중복 탐색을 방지한다. 이게 아주 중요해!!1
        for (
          let visitedIndex = startIndex;
          visitedIndex < visited.length;
          visitedIndex++
        ) {
          if (visited[visitedIndex] === false) {
            visited[visitedIndex] = true;
            chickendfs(depth + 1, visitedIndex);
            visited[visitedIndex] = false;
          }
        }
      } else {
        //distance 계산
        //true로 남길 치킨집만 거리 계산
        const chickenDistance = homes.reduce(
          (prevDistance, currentHome, homeIndex) => {
            const distanceArray = chickens
              .filter((chick, chicIndex) => {
                return visited[chicIndex] === true;
              })
              .map((currentChicken, chickenIndex) => {
                const distance =
                  Math.abs(currentChicken.row - currentHome.row) +
                  Math.abs(currentChicken.col - currentHome.col);
                return distance;
              });
            const minimum = Math.min(...distanceArray);
            return minimum + prevDistance;
          },
          0
        );
        result = result >= chickenDistance ? chickenDistance : result;
      }
    }
  });
