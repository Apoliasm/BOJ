import java.util.*;
class Solution {
    public int[] solution(int[] answers) {
        int [][] patterns = {
            {1,2,3,4,5},
            {2,1,2,3,2,4,2,5},
            {3,3,1,1,2,2,4,4,5,5}
        };
        int[] corrects = {0,0,0};
        for(int i = 0 ; i<answers.length ; i++){
            for(int j = 0 ;j<corrects.length;  j++){
                if(answers[i] == patterns[j][i%patterns[j].length]){
                    corrects[j] += 1;
                }
            }
        }
        
        int max = Arrays.stream(corrects).max().getAsInt();
        ArrayList<Integer> answerAL = new ArrayList<Integer>();
        for(int i = 0 ; i<corrects.length ; i++){
            if(corrects[i] == max) answerAL.add(i+1);
        }
        return answerAL.stream().mapToInt(Integer::intValue).toArray();
    
    }
}