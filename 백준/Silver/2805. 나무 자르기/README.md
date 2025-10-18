# **[Silver II] 나무 자르기 - 2805**

[문제 링크](https://www.acmicpc.net/problem/2805)

### **성능 요약**

메모리: 126472 KB, 시간: 644 ms

### **분류**

이분 탐색, 매개 변수 탐색

### **제출 일자**

2025년 10월 18일 19:00:10

### **문제 설명**

Lumberjack Mirko needs to chop down M metres of wood. It is an easy job for him since he has a nifty new woodcutting machine that can take down forests like wildfire. However, Mirko is only allowed to cut a single row of trees.

Mirko's machine works as follows: Mirko sets a height parameter H (in metres), and the machine raises a giant sawblade to that height and cuts off all tree parts higher than H (of course, trees not higher than H meters remain intact). Mirko then takes the parts that were cut off. For example, if the tree row contains trees with heights of 20, 15, 10, and 17 metres, and Mirko raises his sawblade to 15 metres, the remaining tree heights after cutting will be 15, 15, 10, and 15 metres, respectively, while Mirko will take 5 metres off the first tree and 2 metres off the fourth tree (7 metres of wood in total).

Mirko is ecologically minded, so he doesn't want to cut off more wood than necessary. That's why he wants to set his sawblade as high as possible. Help Mirko find the maximum integer height of the sawblade that still allows him to cut off at least M metres of wood.

### **입력**

The first line of input contains two space-separated positive integers, N (the number of trees, 1 ≤ N ≤ 1 000 000) and M (Mirko's required wood amount, 1 ≤ M ≤ 2 000 000 000).

The second line of input contains N space-separated positive integers less than 1 000 000 000, the heights of each tree (in metres). The sum of all heights is greater than or equal to M, thus Mirko will always be able to obtain the required amount of wood.

### **출력**

The first and only line of output must contain the required height setting.

# 분석

## 이분탐색을 사용하는 배경

- 적어도 m만큼은 남길 수 있는 최대 길이
- 정답이 되는 길이보다 적게하면 안됨, **그 경계값이 존재함을 인지하기**
- [f,f,f,f,f,f,f,**T,T,….]\*\*
  - **이분 탐색으로 값을 찾기**
- 닫힌 구간, 반열린 구간 둘 중 하나를 잘 선택하기

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let trees = [];

let m = 0,
  n = 0,
  lineCount = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
    } else {
      trees = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      readline.close();
    }
  })
  .on("close", () => {
    //[f,f,f,f,f,f,....,T,T,T]
    let [start, end] = [1, Math.max(...trees) + 1];
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      let remain = 0;
      for (let tree of trees) {
        if (tree - mid > 0) {
          remain += tree - mid;
        }
      }
      //적어도 m 미터필요
      //m 보다 나온게 적다면 -> 더 낮게 자르기 -> end 줄이기
      //m보다 나온게 많다면 -> 좀 높게 잘라도 됨 -> start 늘리기
      if (m > remain) end = mid - 1;
      else start = mid + 1;
    }

    console.log(end);
  });
```
