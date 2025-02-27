function solution(nodeinfo){
    let nodeArray = nodeinfo.map((node,index) => {
        let [x,y] = node
        let newNode = new Node(index+1,x,y)
        return newNode
    })
    let sortedNodeArray = nodeArray.sort((a,b) => b.y -a.y )
    let rootNode = sortedNodeArray[0]
    for(let i = 1;  i< sortedNodeArray.length ; i++){
        rootNode.insert(sortedNodeArray[i])
    }
    let preOrderArray = []
    let postOrderArray = []
    //root -> left -> right
    function preorder(node){
        preOrderArray.push(node.index)
        if(node.left !== null){
            preorder(node.left)
        }
        if(node.right !== null){
            preorder(node.right)
        }
    }
    //left -> right -> node
    function postorder(node){
        if(node.left !== null){
            postorder(node.left)
        }
        if(node.right !== null){
            postorder(node.right)
        }
        postOrderArray.push(node.index)
        
    }
    preorder(rootNode)
    postorder(rootNode)
    return [[...preOrderArray],[...postOrderArray]]
}


class Node{
    constructor(index, x, y){
        this.index = index
        this.x = x
        this.y = y
        this.left = null
        this.right = null
    }
    
    insert(node){
        if(this.x > node.x){
            if(this.left === null){
                this.left =node
            }
            else{
                this.left.insert(node)
            }
        }
        else{
            if(this.right === null){
                this.right = node
            }
            else{
                this.right.insert(node)
            }
        }
    }
}
