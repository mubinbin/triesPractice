import java.util.*;

class EscapeRoomKeypad{

    class Node{
        int count;
        String word;
        Node[] next = new Node[26];

        Node(){
            count = 0;
        }
        Node(String word){
            count = 1;
            this.word = word;
        }

    }

    class Tries{

        Node root = new Node();

        public void add(String word){
        
            String finalWord = "";
            addWord(root, word, finalWord);
        }
        
        private void addWord(Node node, String word, String finalWord){

            // return condition
            if(word.length() == 1){
                
                finalWord += word;
                if(node.next[word.charAt(0) - 'A'] == null){
                    node.next[word.charAt(0) - 'A'] = new Node(finalWord);
                }else{
                    node.next[word.charAt(0) - 'A'].count++;
                    node.next[word.charAt(0) - 'A'].word = finalWord;
                }

                return;
            }

            int position = word.charAt(0) - 'A';
            finalWord += word.charAt(0);
            
            if(node.next[position] == null){

                node.next[position] = new Node();
            }

            addWord(node.next[position], word.substring(1), finalWord);
        }
    }




    public static void main(String[] args) {
        
        EscapeRoomKeypad test = new EscapeRoomKeypad();
        Tries testTries = test.new Tries();
        
        testTries.add("AB");
        testTries.add("ABC");
        testTries.add("AB");
        testTries.add("BB");

        System.out.println(testTries.root.toString());
    }
}