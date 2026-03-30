import java.util.*;

class Solution {
    public String minWindow(String s, String t) {
        int begin_index = 0;
        int length = Integer.MAX_VALUE;
        HashMap<Character, Integer> count_map = new HashMap<>(); // char, count

        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            // if (c <= 'Z') {
            //     c += 32;
            // }
            Integer last_count = count_map.get(c);
            if (last_count != null) {
                count_map.put(c, last_count + 1);
            }
            else {
                count_map.put(c, 1);
            }
        }
        
        HashMap<Character, Integer> window_count_map = new HashMap<>(); // char, count
        ArrayDeque<Integer> queue = new ArrayDeque<>();

        int target_count = t.length();
        int temp_count = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            // if (c <= 'Z') {
            //     c += 32;
            // }
            if (count_map.get(c) != null) {
                Integer last_count = window_count_map.get(c);

                if (last_count != null) {
                    window_count_map.put(c, last_count + 1);
                    if (last_count >= count_map.get(c)) {
                        target_count++;
                    }
                }
                else {
                    window_count_map.put(c, 1);
                }

                temp_count++;
                queue.add(i);

                if (temp_count == target_count) {
                    while (true) { 
                        int first_index = queue.getFirst();
                        char c_pop = s.charAt(first_index);
                        // if (c_pop <= 'Z') {
                        //     c_pop += 32;
                        // }
                        if (window_count_map.get(c_pop).equals(count_map.get(c_pop))) {
                            if (i - first_index + 1 < length) {
                                length = i - first_index + 1;
                                begin_index = first_index;
                            }
                            temp_count--;
                            queue.pop();
                            window_count_map.put(c_pop, window_count_map.get(c_pop) - 1);
                            break;
                        }
                        else {
                            window_count_map.put(c_pop, window_count_map.get(c_pop) - 1);
                            target_count--;
                            temp_count--;
                            queue.pop();
                        }
                    }
                }
            }
        }

        return length == Integer.MAX_VALUE ? "" : s.substring(begin_index, begin_index + length);
    }
}

public class Main {
    public static void main(String[] args) {
    }
}
