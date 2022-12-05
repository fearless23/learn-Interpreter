import { get_lines, parse_line } from "./helpers_scanner.js";
// What we will do: lexical analysis / Lexing / Scanning
// Who will do it:  Lexer, Scanner

/**
1. Each line must start with a `const`
2. then after a space: define any variable starting with char
3. then after a space: `=` sign in required
4. then after a space: define arithemetic operation
5. any arithmetic operation will include previously defined variables and numbers
along with arithemtic operations like + - * and /
6. new varialbe defination will start at new line
*/

const text = `
const a = 3;
const b = 4;
const c = a + b + 5;
const d = c - 34;

`;

const output = get_lines(text).map(parse_line);
console.log(JSON.stringify(output, null, 2), "OUTPUT");
