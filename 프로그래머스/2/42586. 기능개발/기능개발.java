import java.util.*;

class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        ArrayList<Integer> answer = new ArrayList<Integer>();
        ArrayDeque<Integer> q1 = new ArrayDeque<Integer>();
        for(int i = 0 ; i<progresses.length ; i++){
            int release = (int) Math.ceil((100.0-progresses[i])/speeds[i]);    
            q1.addLast(release);
        }
        int current = q1.getFirst().intValue();
        int releaseDate = current;
        int processes = 0;
        while(!q1.isEmpty()){
            current = q1.pollFirst().intValue();
            if(releaseDate < current){
                answer.add(processes);
                releaseDate = current;
                processes = 1;
            }
            else{
                processes += 1;
            }
        }
        answer.add(processes);
        return answer.stream().mapToInt(Integer::intValue).toArray();
    }
    
    
}