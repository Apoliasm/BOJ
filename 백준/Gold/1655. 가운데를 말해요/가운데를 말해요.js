class PriorityQueue {
  constructor(compareCallback) {
    this.arr = [0];
    this.compare = compareCallback;
  }
  get length() {
    return this.arr.length - 1;
  }

  peek() {
    if (this.length === 0) return null;
    return this.arr[1];
  }

  push(item) {
    this.arr.push(item);
    this.heapUp();
  }

  heapUp() {
    let current = this.length;
    while (current > 1) {
      let parent = Math.floor(current / 2);
      if (this.compare(parent, current)) break;
      this.swap(current, parent);
      current = parent;
    }
  }

  pop() {
    if (this.length === 0) return null;
    const front = this.arr[1];
    if (this.length === 1) {
      this.arr.pop();
      return front;
    }
    this.arr[1] = this.arr.pop();
    this.heapDown();
    return front;
  }

  heapDown() {
    let current = 1;
    while (current * 2 <= this.length) {
      let leftChild = current * 2;
      let rightChild = current * 2 + 1;
      let nextChild = leftChild;

      if (rightChild <= this.length && this.compare(rightChild, leftChild)) {
        nextChild = rightChild;
      }

      if (this.compare(current, nextChild)) break;

      this.swap(current, nextChild);
      current = nextChild;
    }
  }

  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }
}

const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const n = Number(input[0]);

let rightPQ = new PriorityQueue(function (a, b) {
  return this.arr[a] <= this.arr[b];
});

let leftPQ = new PriorityQueue(function (a, b) {
  return this.arr[a] >= this.arr[b];
});

let center = Number(input[1]);
let answers = [center];

for (let current of input.slice(2).map(Number)) {
  if (current < center) {
    leftPQ.push(current);
  } else {
    rightPQ.push(current);
  }

  if (leftPQ.length > rightPQ.length) {
    rightPQ.push(center);
    center = leftPQ.pop();
  } else if (rightPQ.length > leftPQ.length + 1) {
    leftPQ.push(center);
    center = rightPQ.pop();
  }

  answers.push(center);
}

console.log(answers.join("\n"));
