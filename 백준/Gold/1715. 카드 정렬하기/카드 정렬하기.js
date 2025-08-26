const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Priority_Queue {
  constructor() {
    this.array = [0];
    this.length = 0;
    this.topIndex = 1;
  }

  push(item) {
    this.array.push(item);
    this.length += 1;
    this.heapUp(this.length);
  }
  pop() {
    if (this.length === 0) {
      return null;
    }
    let poped = this.array[this.topIndex];
    this.heapDown();
    this.length -= 1;
    return poped;
  }

  heapUp(currentIndex) {
    let parentIndex = Math.floor(currentIndex / 2);
    while (
      currentIndex >= 1 &&
      this.array[parentIndex] > this.array[currentIndex]
    ) {
      [this.array[parentIndex], this.array[currentIndex]] = [
        this.array[currentIndex],
        this.array[parentIndex],
      ];
      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }
  heapDown() {
    let tailNode = this.array[this.length];
    this.array[this.topIndex] = tailNode;
    this.array.pop();
    let currentIndex = this.topIndex;
    while (currentIndex <= this.length) {
      let nextChild = null;
      let leftChildIndex = currentIndex * 2;
      let rightChildIndex = currentIndex * 2 + 1;
      if (!this.array[leftChildIndex]) {
        break;
      }
      nextChild = !this.array[rightChildIndex]
        ? leftChildIndex
        : this.array[leftChildIndex] < this.array[rightChildIndex]
        ? leftChildIndex
        : rightChildIndex;
      if (this.array[currentIndex] > this.array[nextChild]) {
        [this.array[currentIndex], this.array[nextChild]] = [
          this.array[nextChild],
          this.array[currentIndex],
        ];
      }
      currentIndex = nextChild;
    }
  }
}

let lineCount = 0,
  n = 0,
  nCount = 0,
  input = 0,
  answer = 0;
let pq = new Priority_Queue();

readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      lineCount += 1;
    } else {
      input = Number(line.trim());
      pq.push(input);
      nCount += 1;
      if (nCount === n) readline.close();
    }
  })
  .on("close", () => {
    while (pq.length !== 0) {
      let first = pq.pop();
      let second = pq.pop();
      if (first == null || second == null) {
        break;
      }
      let total = first + second;
      answer += total;
      pq.push(total);
    }
    console.log(answer);
  });
