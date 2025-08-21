const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Edge {
  constructor(src, dest, weight) {
    this.src = src;
    this.dest = dest;
    this.weight = weight;
  }
}

let lineCount = 0,
  v = 0,
  e = 0,
  eCount = 0;
let linked = 0;
let edgeArr = [];
let parent = [];
let ranks = [];
let answer = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [v, e] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      parent = Array.from({ length: v + 1 }, (node, index) => {
        return index;
      });
      ranks = Array(v + 1).fill(0);
      lineCount += 1;
    } else {
      let [src, dest, weight] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      edgeArr.push(new Edge(src, dest, weight));

      eCount += 1;
      if (eCount === e) readline.close();
    }
  })
  .on("close", () => {
    //1. Edge 오름차순 정렬
    edgeArr.sort((a, b) => {
      return a.weight - b.weight;
    });
    for (let edge of edgeArr) {
      let [src, dest, weight] = [edge.src, edge.dest, edge.weight];

      //v-1개 연결되면 완성 된 것 빠져나오기
      if (linked === v - 1) {
        break;
      }
      //같은 부모일 때 = Cycle일 때 아무 것도 하지않음
      if (find(src) === find(dest)) {
        continue;
      }
      //다른 부모일 때 갖다 붙임
      union(src, dest);
      answer += weight;
      linked += 1;
    }

    console.log(answer);
  });

function union(first, second) {
  let firstParent = find(first);
  let secondParent = find(second);
  if (firstParent === secondParent) {
    return;
  }
  if (ranks[firstParent] === ranks[secondParent]) {
    parent[firstParent] = secondParent;
    ranks[secondParent] += 1;
  } else {
    let [smaller, bigger] =
      ranks[firstParent] < ranks[secondParent]
        ? [firstParent, secondParent]
        : [secondParent, firstParent];
    parent[smaller] = bigger;
  }
}

function find(x) {
    // 1단계: 루트 찾기 (root 변수를 위로 계속 따라감)
    let root = x;
    while (root !== parent[root]) {
      root = parent[root];
    }
  
    // 2단계: 경로 압축
    while (x !== parent[x]) {
      const p = parent[x];  // x의 원래 부모
      parent[x] = root;     // x를 루트에 바로 연결
      x = p;                // 다음 노드로 진행
    }
  
    return root; // 최종 루트 반환
  }