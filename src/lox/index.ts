import { Scanner } from "./scanner.js";

const text = `
+
+-=>=
// some comment 33
33
"123456dd  f dfd f dfd 
fd fd df dfd f" Or orchid12 323.++
  &345.456.234
+
-09.87
printf "hello world"
print hello""
fun sum_numbers (a,b){
  return a + b;
}
`;

const x = new Scanner(text);
x.scanner();
x.logTokens();
x.logErrors();
