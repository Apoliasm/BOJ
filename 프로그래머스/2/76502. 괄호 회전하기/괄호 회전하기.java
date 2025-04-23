import java.util.*;

class Solution {
    public int solution(String s) {
        int answer = 0;
        StringBuilder sb = new StringBuilder();
        sb.append(s);
        HashMap<Character, Character> parentMap = new HashMap<>();
        parentMap.put(')','(');
        parentMap.put('}','{');
        parentMap.put(']','['); 
        
        for(int i = 0 ; i<s.length() ; i++){
            char front = sb.charAt(0);
            sb.deleteCharAt(0);
            sb.append(front);
            boolean tf = true;
            Stack<Character> st = new Stack<Character>();
            for(int j = 0 ; j<s.length() ; j++){
                char currentChar = sb.charAt(j);
                if(parentMap.containsValue(currentChar)){
                    st.push(currentChar);
                }else{
                    if(!st.isEmpty() && parentMap.get(currentChar).equals(st.peek())){
                        st.pop();
                    }
                    else{
                        tf = false;
                        break;
                    }
                }
            }
            if(tf && st.isEmpty()){
                answer+=1;
            }
            tf = true;
        }
        return answer;
    }
}