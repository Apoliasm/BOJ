const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
let line = 0;
const t = Number(input[line++]);
let output = [];

for (let tc = 0; tc < t; tc++) {
  const [n, k] = input[line++].split(" ").map(Number);
  const times = [0, ...input[line++].split(" ").map(Number)];

  const graph = Array.from({ length: n + 1 }, () => []);
  const indegree = Array(n + 1).fill(0);

  for (let i = 0; i < k; i++) {
    const [a, b] = input[line++].split(" ").map(Number);
    graph[a].push(b);
    indegree[b]++; // b를 짓기 전에 a가 필요하다는 의미
  }

  const target = Number(input[line++]);

  // 위상 정렬용 큐 + DP 배열
  const dp = Array(n + 1).fill(0);
  const queue = [];
  let head = 0;

  // 선행 건물이 없는 건물들부터 시작 (indegree 0)
  for (let i = 1; i <= n; i++) {
    if (indegree[i] === 0) {
      dp[i] = times[i];
      queue.push(i);
    }
  }

  // 위상 정렬 진행
  while (head < queue.length) {
    const cur = queue[head++];

    for (const next of graph[cur]) {
      // cur을 다 지은 시점에 next가 가질 수 있는 최대 시간 갱신
      if (dp[next] < dp[cur] + times[next]) {
        dp[next] = dp[cur] + times[next];
      }

      // 선행 건물 하나 처리 완료
      indegree[next]--;
      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  output.push(String(dp[target]));
}

console.log(output.join("\n"));
