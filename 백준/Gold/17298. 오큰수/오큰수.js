const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Node {
  constructor(item) {
    this.item = item;
    this.nextNode = null;
  }
}

class Queue {
  constructor() {
    this.length = 0;
    this.headNode = null;
    this.tail = null;
    this.queue = [];
  }

  push(item) {
    let node = new Node(item);
    if (this.length === 0) {
      this.headNode = node;
    } else {
      node.next = this.headNode;
      this.headNode = node;
    }
    this.length += 1;
  }

  pop() {
    if (this.length === 0) {
      return null;
    } else {
      const toPop = this.headNode;
      if (this.length === 1) {
        this.headNode = null;
        this.tail = null;
      }
      this.headNode = toPop.next;
      this.length -= 1;
      return toPop.item;
    }
  }

  front() {
    if (this.length === 0) {
      return null;
    } else {
      return this.headNode.item;
    }
  }
}

let n = 0;
let lineCount = 0;
let seq = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      lineCount += 1;
    } else {
      seq = line
        .trim()
        .split(" ")
        .map((num) => Number(num));
      readline.close();
    }
  })
  .on("close", () => {
    const answers = Array(n).fill(-1);
    const queue = new Queue();
    for (let currentIndex = 0; currentIndex < n; currentIndex++) {
      let currentValue = seq[currentIndex];
      let frontIndex = queue.front();
      while (frontIndex !== null && seq[frontIndex] < currentValue) {
        frontIndex = queue.pop();
        answers[frontIndex] = currentValue;
        frontIndex = queue.front();
      }
      queue.push(currentIndex);
    }
    console.log(answers.join(" "));
  });
/**
 *
 * 완전 탐색한다면, O(n*n)로 해결은 된다.
 * 하지만 n이 백만개면 반드시 시간초과
 * 3 5 7 이렇게 된다면
 *  1번째의 오큰수는 2번째
 *  2번째의 오큰수는 세번째
 * 세번째의 오큰수는 없다. 한번 순회하면서 현재 인덱스보다 큰 수를 처음 만나면 값 바로 저장,
 * 바로 오큰수로 향하여 다음 오큰수 결정
 * a1 ... a2 ... a3 ... a4 형태로 간다.
 * 그럼 중간에 ...에 작은거는?
 * a1 ... a2 사이의 ...1은 반드시 a1보다 작다. a2보다도 당연히 작다.
 * a1 b1 ... b2 a2라면 형태
 * 점점 단위가 작아짐. 그래서 이건 시간복잡도 얼마나 나올까?
 * a1 ... a2만 구하는건? a1...a2 + b1로 돌아가서 b1...b2+ c1로 돌아가서 c1...c2 이 역시 개선된게 없다.
 * 돌아가는 것을 줄여보자 그럼.
 * a1 -> b1 -> c1 -> c2 -> f1-> f2 ->b2 -> d1 -> e1 -> f2 -> d2 -> a2 -> g2(h1) -> g1(i1)
 * 결국 queue 동작 방식 그대로?
 */
