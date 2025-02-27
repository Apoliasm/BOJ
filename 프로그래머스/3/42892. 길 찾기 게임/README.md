# **[level 3] 길 찾기 게임 - 42892**

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42892)

### **성능 요약**

메모리: 43 MB, 시간: 53.77 ms

### **구분**

코딩테스트 연습 > 2019 KAKAO BLIND RECRUITMENT

### **채점결과**

정확성: 100.0

합계: 100.0 / 100.0

### **제출 일자**

2025년 02월 27일 20:27:58

### **문제 설명**

## **길 찾기 게임**

전무로 승진한 라이언은 기분이 너무 좋아 프렌즈를 이끌고 특별 휴가를 가기로 했다.

내친김에 여행 계획까지 구상하던 라이언은 재미있는 게임을 생각해냈고 역시 전무로 승진할만한 인재라고 스스로에게 감탄했다.

라이언이 구상한(그리고 아마도 라이언만 즐거울만한) 게임은, 카카오 프렌즈를 두 팀으로 나누고, 각 팀이 같은 곳을 다른 순서로 방문하도록 해서 먼저 순회를 마친 팀이 승리하는 것이다.

그냥 지도를 주고 게임을 시작하면 재미가 덜해지므로, 라이언은 방문할 곳의 2차원 좌표 값을 구하고 각 장소를 이진트리의 노드가 되도록 구성한 후, 순회 방법을 힌트로 주어 각 팀이 스스로 경로를 찾도록 할 계획이다.

라이언은 아래와 같은 특별한 규칙으로 트리 노드들을 구성한다.

- 트리를 구성하는 모든 노드의 x, y 좌표 값은 정수이다.
- 모든 노드는 서로 다른 x값을 가진다.
- 같은 레벨(level)에 있는 노드는 같은 y 좌표를 가진다.
- 자식 노드의 y 값은 항상 부모 노드보다 작다.
- 임의의 노드 V의 왼쪽 서브 트리(left subtree)에 있는 모든 노드의 x값은 V의 x값보다 작다.
- 임의의 노드 V의 오른쪽 서브 트리(right subtree)에 있는 모든 노드의 x값은 V의 x값보다 크다.

아래 예시를 확인해보자.

라이언의 규칙에 맞게 이진트리의 노드만 좌표 평면에 그리면 다음과 같다. (이진트리의 각 노드에는 1부터 N까지 순서대로 번호가 붙어있다.)

![](https://grepp-programmers.s3.amazonaws.com/files/production/dbb58728bd/a5371669-54d4-42a1-9e5e-7466f2d7b683.jpg)

이제, 노드를 잇는 간선(edge)을 모두 그리면 아래와 같은 모양이 된다.

![](https://grepp-programmers.s3.amazonaws.com/files/production/6bd8f6496a/50e1df20-5cb7-4846-86d6-2a2f1e70c5da.jpg)

위 이진트리에서 전위 순회(preorder), 후위 순회(postorder)를 한 결과는 다음과 같고, 이것은 각 팀이 방문해야 할 순서를 의미한다.

- 전위 순회 : 7, 4, 6, 9, 1, 8, 5, 2, 3
- 후위 순회 : 9, 6, 5, 8, 1, 4, 3, 2, 7

다행히 두 팀 모두 머리를 모아 분석한 끝에 라이언의 의도를 간신히 알아차렸다.

그러나 여전히 문제는 남아있다. 노드의 수가 예시처럼 적다면 쉽게 해결할 수 있겠지만, 예상대로 라이언은 그렇게 할 생각이 전혀 없었다.

이제 당신이 나설 때가 되었다.

곤경에 빠진 카카오 프렌즈를 위해 이진트리를 구성하는 노드들의 좌표가 담긴 배열 nodeinfo가 매개변수로 주어질 때,

노드들로 구성된 이진트리를 전위 순회, 후위 순회한 결과를 2차원 배열에 순서대로 담아 return 하도록 solution 함수를 완성하자.

### **제한사항**

- nodeinfo는 이진트리를 구성하는 각 노드의 좌표가 1번 노드부터 순서대로 들어있는 2차원 배열이다.
  - nodeinfo의 길이는 `1` 이상 `10,000` 이하이다.
  - nodeinfo[i] 는 i + 1번 노드의 좌표이며, [x축 좌표, y축 좌표] 순으로 들어있다.
  - 모든 노드의 좌표 값은 `0` 이상 `100,000` 이하인 정수이다.
  - 트리의 깊이가 `1,000` 이하인 경우만 입력으로 주어진다.
  - 모든 노드의 좌표는 문제에 주어진 규칙을 따르며, 잘못된 노드 위치가 주어지는 경우는 없다.

---

### **입출력 예**

| nodeinfo                                                  | result                                    |
| --------------------------------------------------------- | ----------------------------------------- |
| [[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]] | [[7,4,6,9,1,8,5,2,3],[9,6,5,8,1,4,3,2,7]] |

### **입출력 예 설명**

입출력 예 #1

문제에 주어진 예시와 같다.

> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges

# 분석

- **주어진 nodeinfo로 부터 트리를 만들기**
  - 이걸 어떻게 만드느냐에서 용기를 잃었음..
  - y축이 큰 거부터 나열하면 자연스럽게 left, right만 들어가면 되는 구조
  - 일단 root를 찾고, root에서 부터 왼쪽, 오른쪽으로 하나씩 집어 넣는 방식으로 tree를 만들기
- **잊을만하면 나오는 트리 순회**
  - **preorder** : root → left → right
  - **postorder** : left→ right → root
  - **inorder** : left → root → right

```tsx
function solution(nodeinfo) {
  let nodeArray = nodeinfo.map((node, index) => {
    let [x, y] = node;
    let newNode = new Node(index + 1, x, y);
    return newNode;
  });
  let sortedNodeArray = nodeArray.sort((a, b) => b.y - a.y);
  let rootNode = sortedNodeArray[0];
  for (let i = 1; i < sortedNodeArray.length; i++) {
    rootNode.insert(sortedNodeArray[i]);
  }
  let preOrderArray = [];
  let postOrderArray = [];
  //root -> left -> right
  function preorder(node) {
    preOrderArray.push(node.index);
    if (node.left !== null) {
      preorder(node.left);
    }
    if (node.right !== null) {
      preorder(node.right);
    }
  }
  //left -> right -> node
  function postorder(node) {
    if (node.left !== null) {
      postorder(node.left);
    }
    if (node.right !== null) {
      postorder(node.right);
    }
    postOrderArray.push(node.index);
  }
  preorder(rootNode);
  postorder(rootNode);
  return [[...preOrderArray], [...postOrderArray]];
}

class Node {
  constructor(index, x, y) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
  }

  insert(node) {
    if (this.x > node.x) {
      if (this.left === null) {
        this.left = node;
      } else {
        this.left.insert(node);
      }
    } else {
      if (this.right === null) {
        this.right = node;
      } else {
        this.right.insert(node);
      }
    }
  }
}
```
