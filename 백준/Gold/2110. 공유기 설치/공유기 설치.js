const { hostname } = require("os");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0,
  n = 0,
  nCount = 0,
  c = 0,
  answer = 0;
let homes = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, c] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
    } else {
      let home = Number(line.trim());
      homes.push(home);
      nCount += 1;
      if (nCount === n) {
        readline.close();
      }
    }
  })
  .on("close", () => {
    homes.sort((a, b) => {
      return a - b;
    });

    //[1,2,3,....,N] = [T,T,T,T,F,F,.....]
    //마지막 true값은 무엇인가를 찾기 = 이분 탐색
    //start =
    let [start, end] = [1, homes[n - 1] - homes[0]];
    let mid = 0;
    let answer = 0;
    while (start <= end) {
      mid = Math.floor((end + start) / 2);
      if (isAble(mid)) {
        //이 거리에 설치 가능하다 = 더 작은 거리도 가능
        //그러니 더 키워본다. 이보다 큰 값(mid)는 가능하냐?
        answer = mid;
        start = mid + 1;
      }
      //안되면 더 작은 숫자로 시도해본다.
      else {
        end = mid - 1;
      }
    }
    console.log(end);

    function isAble(distance) {
      let lastIndex = 0;
      let device = homes[lastIndex];
      let installed = 1;
      for (let index = 1; index < n; index++) {
        if (homes[index] >= device + distance) {
          device = homes[index];
          installed += 1;
        }
        if (installed === c) {
          return true;
        }
      }
      return false;
    }
  });

/**
 *
 *
 * 최솟값을 최대로 만들기
 * 1 2 4 8 9
 *
 *  */
