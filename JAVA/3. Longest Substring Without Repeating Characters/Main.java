import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        
        int result = 0;
        HashMap<Character, Integer> map = new HashMap<>(); // char, last index

        int left = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            Integer last_index = map.get(c);
            if (last_index != null) {
                if (last_index + 1 > left) {
                    result = Math.max(result, i - left);
                    left = last_index + 1;
                }
            }
            map.put(c, i);
        }
        
        result = Math.max(result, s.length() - left);

        return result;
    }
}

public class Main {
    public static void main(String[] args) {
    }
}
