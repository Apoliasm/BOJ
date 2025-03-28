- 문제
  # **[level 3] 이중우선순위큐 - 42628**
  [문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42628)
  ### **성능 요약**
  메모리: 55.3 MB, 시간: 78.53 ms
  ### **구분**
  코딩테스트 연습 > 힙（Heap）
  ### **채점결과**
  정확성: 100.0
  합계: 100.0 / 100.0
  ### **제출 일자**
  2025년 03월 25일 20:29:35
  ### **문제 설명**
  이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조를 말합니다.
  | 명령어 | 수신 탑(높이)                  |
  | ------ | ------------------------------ |
  | I 숫자 | 큐에 주어진 숫자를 삽입합니다. |
  | D 1    | 큐에서 최댓값을 삭제합니다.    |
  | D -1   | 큐에서 최솟값을 삭제합니다.    |
  이중 우선순위 큐가 할 연산 operations가 매개변수로 주어질 때, 모든 연산을 처리한 후 큐가 비어있으면 [0,0] 비어있지 않으면 [최댓값, 최솟값]을 return 하도록 solution 함수를 구현해주세요.
  ### **제한사항**
  - operations는 길이가 1 이상 1,000,000 이하인 문자열 배열입니다.
  - operations의 원소는 큐가 수행할 연산을 나타냅니다.
    - 원소는 “명령어 데이터” 형식으로 주어집니다.- 최댓값/최솟값을 삭제하는 연산에서 최댓값/최솟값이 둘 이상인 경우, 하나만 삭제합니다.
  - 빈 큐에 데이터를 삭제하라는 연산이 주어질 경우, 해당 연산은 무시합니다.
  ### **입출력 예**
  | operations                                                                  | return     |
  | --------------------------------------------------------------------------- | ---------- |
  | ["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]                  | [0,0]      |
  | ["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"] | [333, -45] |
  ### **입출력 예 설명**
  입출력 예 #1
  - 16과 -5643을 삽입합니다.
  - 최솟값을 삭제합니다. -5643이 삭제되고 16이 남아있습니다.
  - 최댓값을 삭제합니다. 16이 삭제되고 이중 우선순위 큐는 비어있습니다.
  - 우선순위 큐가 비어있으므로 최댓값 삭제 연산이 무시됩니다.
  - 123을 삽입합니다.
  - 최솟값을 삭제합니다. 123이 삭제되고 이중 우선순위 큐는 비어있습니다.
  따라서 [0, 0]을 반환합니다.
  입출력 예 #2
  - 45와 653을 삽입후 최댓값(653)을 삭제합니다. -45가 남아있습니다.
  - 642, 45, 97을 삽입 후 최댓값(97), 최솟값(-642)을 삭제합니다. -45와 45가 남아있습니다.
  - 333을 삽입합니다.
  이중 우선순위 큐에 -45, 45, 333이 남아있으므로, [333, -45]를 반환합니다.
  ***
  ※ 공지 - 2024년 7월 22일 테스트케이스가 추가되었습니다. 기존에 제출한 코드가 통과하지 못할 수도 있습니다.
  > 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges
- 분석
  - 새로운 자료구조에 대한 요구사항
  - 항상 최대, 최솟값만 출력한다
    - 우선순위 큐 두 개 구현하기
    - maxheap,minheap
  - 하지만 이렇게만 하면 minheap에서 pop한 게 maxheap에서 구현 안되는 등 문제 발생
    - pop된 element인지 아닌지 판단하는 값 하나 필요
  - **힙 구현 익혀두기**
    1. 리스트로 heap
       1. 이때 0번째 index 사용하지 않음
    2. push
       1. 제일 끝에 두고, 부모랑 비교하면서 올리는 코드 필요
    3. pop
       1. 1번째 pop
       2. 젤 끝 element 첫번째로 올리기
       3. 왼쪽 자식, 오른쪽 자식이랑 비교해서 더 큰것/작은 것이랑 현재 부모 비교해서 자리 바꾸기
  ```tsx
  function solution(operations) {
      var answer = [];
      const maxHeap = new MaxHeap();
      const minHeap = new MinHeap();
      const keyArray = [];
      let currentLength = 0;

      operations.forEach((operation, index) => {
          let [cmd, value] = operation.split(" ");
          if (cmd === 'I') {
              let element = {
                  value: parseInt(value),
                  key: keyArray.length,
                  exist: true
              };
              keyArray.push(element);
              maxHeap.push(element);
              minHeap.push(element);
              currentLength += 1;
          } else if(currentLength > 0 ){
              if (value == -1) {
                  let front = minHeap.getFront();
                  while (front && currentLength > 0&& keyArray[front.key].exist== false) {
                      minHeap.pop();
                      front = minHeap.getFront();
                  }
                  if (front && currentLength > 0) {
                      minHeap.pop();
                      keyArray[front.key].exist = false;
                      currentLength--;
                  }
              } else if (value == 1) {
                  let front = maxHeap.getFront();
                  while (front && currentLength > 0&&keyArray[front.key].exist == false) {
                      maxHeap.pop();
                      front = maxHeap.getFront();
                  }
                  if (front && currentLength > 0 ) {
                      maxHeap.pop();
                      keyArray[front.key].exist = false;
                      currentLength--;
                  }
              }
          }
      });

      // 빈 경우 예외 처리
      if (currentLength === 0) {
          return [0, 0];
      }

      let maxVal = maxHeap.getFront();
      while (maxVal && !keyArray[maxVal.key].exist) {
          maxHeap.pop();
          maxVal = maxHeap.getFront();
      }

      let minVal = minHeap.getFront();
      while (minVal && !keyArray[minVal.key].exist) {
          minHeap.pop();
          minVal = minHeap.getFront();
      }

      return [maxVal ? maxVal.value : 0, minVal ? minVal.value : 0];
  }

  **class Heap {
      constructor() {
          this.heap = [{ value: 0, key: -1, exist: true }];
      }
      swap(a, b) {
          let tempValue = this.heap[a];
          this.heap[a] = this.heap[b];
          this.heap[b] = tempValue;
      }
      getLength() {
          return this.heap.length - 1;
      }
      getFront() {
          return this.getLength() > 0 ? this.heap[1] : undefined;
      }
      push(element) {
          this.heap.push(element);
          this.pushHeapify();
      }
      pop() {
          if (this.getLength() !== 0) {
              let front = this.heap[1];
              this.popHeapify();
              return front;
          }
      }
  }**

  class MaxHeap extends Heap {
      **pushHeapify() {
          let currentIndex = this.getLength();
          while (currentIndex > 1) {
              let parentIndex = Math.floor(currentIndex / 2);
              if (this.heap[currentIndex].value > this.heap[parentIndex].value) {
                  this.swap(currentIndex, parentIndex);
                  currentIndex = parentIndex;
              } else {
                  break;
              }
          }
      }**

      **popHeapify() {
          let currentIndex = 1;
          this.heap[currentIndex] = this.heap[this.getLength()];
          this.heap.pop();
          let leftChild = currentIndex * 2;
          let rightChild = currentIndex * 2 + 1;
          let largest = currentIndex;

          while (largest <= this.getLength()) {
              if (leftChild <= this.getLength() && this.heap[leftChild].value > this.heap[largest].value) {
                  largest = leftChild;
              }
              if (rightChild <= this.getLength() && this.heap[rightChild].value > this.heap[largest].value) {
                  largest = rightChild;
              }

              if (largest !== currentIndex) {
                  this.swap(currentIndex, largest);
                  currentIndex = largest;
                  leftChild = currentIndex*2
                  rightChild = currentIndex*2 + 1
              } else {
                  break;
              }
          }
      }**
  }

  class MinHeap extends Heap {
      pushHeapify() {
          let currentIndex = this.getLength();
          while (currentIndex > 1) {
              let parentIndex = Math.floor(currentIndex / 2);
              if (this.heap[currentIndex].value < this.heap[parentIndex].value) {
                  this.swap(currentIndex, parentIndex);
                  currentIndex = parentIndex;
              } else {
                  break;
              }
          }
      }

      popHeapify() {
          let currentIndex = 1;
          this.heap[currentIndex] = this.heap[this.getLength()];
          this.heap.pop();
          let leftChild = currentIndex * 2;
          let rightChild = currentIndex * 2 + 1;
          let smallest = currentIndex;

          while (smallest <= this.getLength()) {
              if (leftChild <= this.getLength() && this.heap[leftChild].value < this.heap[smallest].value) {
                  smallest = leftChild;
              }
              if (rightChild <= this.getLength() && this.heap[rightChild].value < this.heap[smallest].value) {
                  smallest = rightChild;
              }

              if (smallest !== currentIndex) {
                  this.swap(currentIndex, smallest);
                  currentIndex = smallest;
                  leftChild = currentIndex*2
                  rightChild = currentIndex*2 + 1
              } else {
                  break;
              }
          }
      }
  }

  ```
