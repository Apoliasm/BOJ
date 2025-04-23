import java.util.*;
class Solution {
    public int[] solution(int[] numbers) {
        HashSet<Integer> hs1 = new HashSet<Integer>();
        for(int i = 0 ; i<numbers.length-1 ; i++){
            for(int j = i+1 ; j<numbers.length ; j++){
                hs1.add(numbers[i] + numbers[j]);
            }
        }
        
        return hs1.stream().sorted().mapToInt(Integer::intValue).toArray();
        
    }
}