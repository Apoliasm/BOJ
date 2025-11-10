const fs = require("fs");
const { deflateSync } = require("zlib");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
let glaciers = [];
const field = input.slice(1).map((row, rowIndex) =>
  row.split(" ").map((val, colIndex) => {
    if (val != 0) {
      glaciers.push({ row: rowIndex, col: colIndex });
    }
    return Number(val);
  })
);
let years = 0;
//상하좌우
const dirRow = [-1, 1, 0, 0];
const dirCol = [0, 0, -1, 1];
let visited = Array.from({ length: n }, (_) => Array(m).fill(false));

while (checkPiece()) {
  let melted = [];
  for (let { row, col } of glaciers) {
    if (field[row][col] === 0) {
      melted.push(0);
      continue;
    }
    let seas = checkSea(row, col);
    melted.push(seas);
  }
  for (let i = 0; i < glaciers.length; i++) {
    let { row, col } = glaciers[i];
    field[row][col] -= melted[i];
    if (field[row][col] < 0) field[row][col] = 0;
  }
  years += 1;
}
console.log(years);
function checkSea(row, col) {
  let seas = 0;
  for (let dir = 0; dir < 4; dir++) {
    let [nextR, nextC] = [row + dirRow[dir], col + dirCol[dir]];
    if (!isMovable(nextR, nextC)) continue;
    if (field[nextR][nextC] === 0) seas += 1;
  }
  return seas;
}

function checkPiece() {
  visited = Array.from({ length: n }, (_) => Array(m).fill(false));
  let dfsd = false;
  let seas = 0;
  for (let { row, col } of glaciers) {
    if (field[row][col] === 0) {
      seas += 1;
      continue;
    }
    if (dfsd && !visited[row][col]) return false;
    dfs(row, col);
    dfsd = true;
  }
  if (seas === glaciers.length) {
    years = 0;
    return false;
  }
  return true;
}

function dfs(row, col) {
  visited[row][col] = true;
  for (let dir = 0; dir < 4; dir++) {
    let [nextR, nextC] = [row + dirRow[dir], col + dirCol[dir]];
    if (!isMovable(nextR, nextC)) continue;
    if (field[nextR][nextC] === 0) continue;
    if (visited[nextR][nextC]) continue;
    dfs(nextR, nextC);
  }
}

function isMovable(row, col) {
  if (row < 0 || col < 0 || row >= n || col >= m) return false;
  return true;
}

/**
 *
 * 처음엔 한덩이, 그 뒤로도 한 덩이. 최종적으로는 두덩이이상
 * 덩이 체크, 맨 첫 빙하조각만 찾으면 dfs -> 순회만 하면 되니까
 * 첫 순회때 덩이 찾고 저장, 그 덩이만 돌면서 녹이기
 * 그 다음 또 덩이를 이루는지 결국 체크해야함
 * 그러니까 dfs 계속 돌리기 -> O(nm) -> 0이상 10 이하 길어도 10년
 * 그냥 다 해보면 될듯
 */
