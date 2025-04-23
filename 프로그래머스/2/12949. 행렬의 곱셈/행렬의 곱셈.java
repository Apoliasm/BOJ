class Solution {
    public int[][] solution(int[][] arr1, int[][] arr2) {
        int rl1 = arr1.length;
        int cl1 = arr1[0].length;
        int rl2 = arr2.length;
        int cl2 = arr2[0].length;
        int[][] answer = new int[rl1][cl2];
        
        for(int i = 0 ; i<rl1 ; i++){
            for(int j = 0 ; j<cl2 ; j++){
                for(int k = 0 ; k<cl1 ; k++){
                    answer[i][j] += arr1[i][k] * arr2[k][j];
                }
            }
        }
        return answer;
    }
}
