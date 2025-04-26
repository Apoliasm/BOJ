import java.util.*;

class Solution {
    private class Node{
        int x,y;
        Node(int x, int y){
            this.x = x;
            this.y = y;
        }
    }
    private int[][] dist;
    private int n;
    private int m;
    private int[] dirX = {1,-1,0,0};
    private int[] dirY = {0,0,-1,1};
    private ArrayDeque<Node> q1;
    private boolean isValidNext(int nextX,int nextY){
        if(nextX < 0 || nextX >= n || nextY < 0 || nextY >= m ){
             return false;
        }
        return true;   
    }
    
    public int solution(int[][] maps) {
        n = maps.length;
        m = maps[0].length;
        dist = new int[n][m];
        dist[0][0] = 1;
        q1 = new ArrayDeque<>();
        q1.addLast(new Node(0,0));
        
        while(!q1.isEmpty()){
            int currentLength = q1.size();
            
            for(int i = 0 ; i<currentLength ; i++){
                Node currentNode = q1.pollFirst(); 
                int currentX = currentNode.x;
                int currentY = currentNode.y;
                for(int j = 0 ; j<4 ; j++){
                    int nextX = currentX+dirX[j];
                    int nextY = currentY+dirY[j];
                    if(!isValidNext(nextX,nextY)){
                        continue;
                    }
                    if(maps[nextX][nextY] == 0){
                        continue;
                    }
                    if(dist[nextX][nextY] == 0 ){
                        q1.addLast(new Node(nextX,nextY));
                        dist[nextX][nextY] = dist[currentX][currentY] + 1;
                    }
                }
            }
                
        }
        
        return dist[n-1][m-1] == 0 ? -1 : dist[n-1][m-1];
    }
}