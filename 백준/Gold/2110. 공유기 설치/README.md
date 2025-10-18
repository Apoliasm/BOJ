# **[Gold IV] 공유기 설치 - 2110**

[문제 링크](https://www.acmicpc.net/problem/2110)

### **성능 요약**

메모리: 25876 KB, 시간: 288 ms

### **분류**

이분 탐색, 매개 변수 탐색

### **제출 일자**

2025년 10월 17일 17:23:17

### **문제 설명**

Farmer John has built a new long barn, with N (2 <= N <= 200,000) stalls. The stalls are located along a straight line at positions x1,...,xN (0 <= xi <= 1,000,000,000).

His C (2 <= C <= N) cows don't like this barn layout and become aggressive towards each other once put into a stall. To prevent the cows from hurting each other, FJ want to assign the cows to the stalls, such that the minimum distance between any two of them is as large as possible. What is the largest minimum distance?

### **입력**

- Line 1: Two space-separated integers: N and C
- Lines 2..N+1: Line i+1 contains an integer stall location, xi

### **출력**

- Line 1: One integer: the largest minimum distance

# 분석

## 이분 탐색을 왜 사용해야하지?

- **두 공유기 사이의 최소 거리의 최댓값**
  - **단조적 형태**의 답을 이루게 될 것이다.
  - 최소 거리의 최댓값 = 그 앞의 값은 전부 가능
  ```tsx
  공유기 사이의 거리------[**1,2,3,4,5**,6,7........,N]
  이 거리 가능여부 -------[**T,T,T,T,F**,F,F,.......,F]
  ```
  - **단조적인 구조를 이룰 때 정답을 이분 탐색으로 알아내기 → 파라메트릭 서치**
  - **하한 인덱스, 상한 인덱스를 찾을 때**
  - **정답이 되는 범위를 절반씩 줄인다고 생각하기**
- 두 집 사이의 모든 거리를 찾기?
  - nC2로 알아내는 것 보다는… 그냥 1부터 n을 줄세우는게 나음
  - 이분 탐색으로 구한다면 O(n)을 넘어서, O(logn)으로 구할 수 있음

## 이분 탐색 구현 디테일

1. 닫힌 구간 [start, end]

   - 이 구간내의 값은 다 가능함.
     - 이 구간을 벗어난다면 갑자기 불가능해지는 것
     - start = end인 상황에서
       - True라면 → 여기까진 가능하다 → start 늘어남
         ```tsx
         TTTTTTTTF
                S
                E
             ↓
         TTTTTTTTF
                 S
                E
         ㄴ 종료
         ```
       - False라면 → 여기부터는 안된다 → end 줄임
         ```tsx
         TTTTTTTTF
                S
                E
             ↓
         TTTTTTTTF
                S
                 E
              ↓
         TTTTTTTTF
                 S
                E
         ㄴ 종료
         ```

   1. while(start ≤ end)로 반복
   2. **최종에는 start는 최초로 불가능한 지점, end는 마지막으로 가능한 지점이 될 것**

   ```tsx
   //[T,T,T,T,T,T,F,F,F,F,F,....]
   while(start <= end){
   	//mid값 가능 = 더 큰 값은 되냐? = start 늘림
   	if(isAble(mid))  start = mid + 1
   	//mid값 불가능 = 더 작은 값은 되겠지? -> end 줄임
   	else if(!isAble(mid)) end = mid - 1
   }
   **return end**
   ```

2. 반열린 구간 [start, end)

   1. whlie(start<end)
   2. **종료시에는 start == end인 지점, 이 지점이 정답이 됨**

   ```tsx
   //[T,T,T,T,T,T,F,F,F,F,F,F,....]
   //[0,1,2,3,4,5,6,7,8,...]
   while (start < end) {
     if (isAble(mid)) start = mid + 1;
     else if (!isAble(mid)) end = mid;
   }
   return start; //return end
   ```

   - [start,end] = [4,6], mid = 5 → true → start = mid + 1 = 6
     - [start,end] = [6,6] → 종료
   - [start,end] = [5,6] mid = 5 → true → start = mid+1 = 6
     - [start,end] = [6,6] → 종료 → F가 최소 = 6

   ### 결론

   - [0,….m]인 최댓값 구하기 = end 값을 구하는 첫번째
   - [m+1,….n]인 최솟값 = start 값과 end가 같아지는 반열림 구간

# 코드

```tsx
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
```
