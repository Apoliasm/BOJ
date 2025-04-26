import java.util.*;
class Solution {
    public int solution(int[][] triangle) {
        int answer = 0;
        int depth = triangle.length;
        int[][] maximum = new int[depth][];
        for(int i = 0 ; i<depth ; i++){
            maximum[i] = new int[i+1];
        }
        maximum[0][0] = triangle[0][0];
        for(int i = 0 ; i<depth-1 ; i++){
            for(int j= 0 ; j<=i ; j++){
                maximum[i+1][j] = Math.max(maximum[i][j] + triangle[i+1][j] , maximum[i+1][j]);
                maximum[i+1][j+1] = Math.max(maximum[i][j] + triangle[i+1][j+1], maximum[i+1][j+1]);
                
            }
        }
        
        return Arrays.stream(maximum[depth-1]).max().getAsInt();
    }
}
