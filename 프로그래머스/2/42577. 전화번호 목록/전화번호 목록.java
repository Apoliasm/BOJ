import java.util.*;

class Solution {
    public boolean solution(String[] phone_book) {
        boolean answer = true;
        HashMap<String,Integer> hm1 = new HashMap<>();
        for(String str : phone_book){
            hm1.put(str,str.length());
        }
        for(String str: phone_book){
            for(int j = 0 ; j< str.length() ; j++){
                if(hm1.containsKey(str.substring(0,j))){
                    return false;
                }
            }
        }
        return true;
    }
}