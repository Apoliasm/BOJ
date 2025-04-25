import java.util.*;

class Solution {
    public int solution(int[] nums) {
        int answer;
        HashMap<Integer,Integer> hm = new HashMap<>();
        for(int pokemon : nums){
            hm.put(pokemon,hm.getOrDefault(pokemon,0));
        }
        if(hm.size() >= nums.length/2){
            answer = nums.length/2;
        }else{
            answer = hm.size();
        }
        
        return answer;
    }
}