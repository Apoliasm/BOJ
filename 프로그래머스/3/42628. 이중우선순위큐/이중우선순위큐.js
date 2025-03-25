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

class Heap {
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
}

class MaxHeap extends Heap {
    pushHeapify() {
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
    }

    popHeapify() {
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
    }
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
