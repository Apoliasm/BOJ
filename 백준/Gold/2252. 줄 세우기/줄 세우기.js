const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0,
  n = 0,
  m = 0,
  nCount = 0;
class Node {
  constructor(value) {
    this.value = value;
    this.upperCount = 0;
    this.lowerCount = 0;
    this.upperNodes = [];
    this.lowerNodes = [];
  }
}

class QueueNode {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(item) {
    let pushNode = new QueueNode(item);
    if (this.head === null) {
      this.head = pushNode;
    } else {
      this.tail.next = pushNode;
    }
    this.tail = pushNode;
    this.length += 1;
  }
  pop() {
    if (this.head === null || this.length === 0) {
      return;
    }
    let popNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = popNode.next;
    }
    this.length -= 1;
    return popNode.item;
  }
}

let nodes = [];
let answer = [];

readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [m, n] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
      nodes = Array.from({ length: m + 1 }, (_, index) => {
        return new Node(index);
      });
    } else {
      [a, b] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      getInput(a, b);
      nCount += 1;
      if (nCount === n) {
        readline.close();
      }
    }

    function getInput(front, rear) {
      let frontNode = nodes[front];
      let rearNode = nodes[rear];
      frontNode.lowerCount += 1;
      frontNode.lowerNodes.push(rearNode);
      rearNode.upperCount += 1;
      rearNode.upperNodes.push(frontNode);
    }
  })
  .on("close", () => {
    let queue = new Queue();
    //get headNodes
    //진입차수 0인 노드 먼저 넣고 시작
    for (let index = 1; index <= m; index++) {
      if (nodes[index].upperCount === 0) {
        queue.push(nodes[index]);
      }
    }
    while (queue.length !== 0) {
      const currentNode = queue.pop();
      answer.push(currentNode.value);

      for (const nextNode of currentNode.lowerNodes) {
        nextNode.upperCount -= 1;
        if (nextNode.upperCount === 0) {
          queue.push(nextNode);
        }
      }
    }
    console.log(answer.join(" "));
  });
