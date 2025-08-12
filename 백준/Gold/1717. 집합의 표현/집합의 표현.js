const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0,
  n = 0,
  m = 0,
  mCount = 0;
let parents = [];
let answer = [];
let ranks = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
      parents = Array.from({ length: n + 1 }, (_, i) => Number(i));
      ranks = Array(n + 1).fill(0);
    } else {
      let [cmd, first, second] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));

      if (cmd === 0) {
        union(first, second);
      } else {
        Check(first, second);
      }
      mCount += 1;
      if (mCount === m) {
        readline.close();
      }
    }
  })
  .on("close", () => {
    console.log(answer.join("\n"));
  });

function union(first, second) {
  let firstParent = find(first)
  let secondParent = find(second)
  if(firstParent === secondParent){
    return;
  }

  if(ranks[firstParent] < ranks[secondParent]){
    parents[firstParent] = secondParent;
  }
  else if(ranks[firstParent] > ranks[secondParent]){
    parents[secondParent] = firstParent
  }
  else{
    parents[firstParent] = secondParent;
    ranks[secondParent] += 1
  }
}

function Check(first, second) {
  let firstParent = find(first);
  let secondParent = find(second);
  if (firstParent === secondParent) {
    answer.push("YES");
  } else {
    answer.push("NO");
  }
}

function find(node) {
  if (parents[node] === node) {
    return node;
  }
  return parents[node] = find(parents[node]);
}
