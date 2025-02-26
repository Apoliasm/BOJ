# **[level 2] 하노이의 탑 - 12946**

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12946?language=javascript)

### **성능 요약**

메모리: 49.5 MB, 시간: 15.19 ms

### **구분**

코딩테스트 연습 > 연습문제

### **채점결과**

정확성: 100.0

합계: 100.0 / 100.0

### **제출 일자**

2025년 02월 26일 20:57:55

### **문제 설명**

하노이 탑(Tower of Hanoi)은 퍼즐의 일종입니다. 세 개의 기둥과 이 기동에 꽂을 수 있는 크기가 다양한 원판들이 있고, 퍼즐을 시작하기 전에는 한 기둥에 원판들이 작은 것이 위에 있도록 순서대로 쌓여 있습니다. 게임의 목적은 다음 두 가지 조건을 만족시키면서, 한 기둥에 꽂힌 원판들을 그 순서 그대로 다른 기둥으로 옮겨서 다시 쌓는 것입니다.

1. 한 번에 하나의 원판만 옮길 수 있습니다.
2. 큰 원판이 작은 원판 위에 있어서는 안됩니다.

하노이 탑의 세 개의 기둥을 왼쪽 부터 1번, 2번, 3번이라고 하겠습니다. 1번에는 n개의 원판이 있고 이 n개의 원판을 3번 원판으로 최소 횟수로 옮기려고 합니다.

1번 기둥에 있는 원판의 개수 n이 매개변수로 주어질 때, n개의 원판을 3번 원판으로 최소로 옮기는 방법을 return하는 solution를 완성해주세요.

### **제한사항**

- n은 15이하의 자연수 입니다.

---

### **입출력 예**

| n   | result                  |
| --- | ----------------------- |
| 2   | [ [1,2], [1,3], [2,3] ] |

### **입출력 예 설명**

입출력 예 #1

다음과 같이 옮길 수 있습니다.

!https://i.imgur.com/SWEqD08.png

!https://i.imgur.com/mrmOzV2.png

!https://i.imgur.com/Ent83gA.png

!https://i.imgur.com/osJFfhF.png

> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges

# 분석

## 추상화 되는 구조를 파악하기

- n개 옮기기 → n-1개 다른 곳에 옮기기 → n번째 목적지에 옮기기 → n-1개 목적지에 옮기기
- 이 구조를 철저히 따르는 구조

### 재귀를 함부로 써도 되는지?

- n = 15일때 49mb, 15까지는 무리없음
- 하지만 너무 큰 수 일 때는 dp를 고려하기

```tsx
function solution(n) {
  return getHanoi(1, 3, 2, n);
}

function getHanoi(src, dest, other, layer) {
  if (layer === 1) {
    return [[src, dest]];
  } else {
    return [
      ...getHanoi(src, other, dest, layer - 1),
      [src, dest],
      ...getHanoi(other, dest, src, layer - 1),
    ];
  }
}
```
