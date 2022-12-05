const TOKENS = {
	// Single-character tokens.
	LEFT_PAREN: "LEFT_PAREN", // (
	RIGHT_PAREN: "RIGHT_PAREN", // )
	LEFT_BRACE: "LEFT_BRACE", // [
	RIGHT_BRACE: "RIGHT_BRACE", // ]
	COMMA: "COMMA", // ,
	DOT: "DOT", // .
	MINUS: "MINUS", // -
	PLUS: "PLUS", // +
	SEMICOLON: "SEMICOLON", // ;
	SLASH: "SLASH", // /
	STAR: "STAR", // *

	// One or two character tokens.
	BANG: "BANG", // !
	BANG_EQUAL: "BANG_EQUAL", // !=
	EQUAL: "EQUAL", // =
	EQUAL_EQUAL: "EQUAL_EQUAL", // ==
	GREATER: "GREATER", // >
	GREATER_EQUAL: "GREATER_EQUAL", // >=
	LESS: "LESS", // <
	LESS_EQUAL: "LESS_EQUAL", // <=

	// Literals
	IDENTIFIER: "IDENTIFIER",
	STRING: "STRING",
	NUMBER: "NUMBER",

	// Keywords
	AND: "AND", // and
	CLASS: "CLASS", // class
	ELSE: "ELSE", // else
	FALSE: "FALSE", // false
	FUN: "FUN", // fun
	FOR: "FOR", // for
	IF: "IF", // if
	NIL: "NIL", // nil
	OR: "OR", // or
	PRINT: "PRINT", // print
	RETURN: "RETURN", // return
	SUPER: "SUPER", // super
	THIS: "THIS", // this
	TRUE: "TRUE", // true
	VAR: "VAR", // var
	WHILE: "WHILE", // while
	EOF: "EOF", //
};

const IDENTIFIERS = {
	and: "AND",
	class: "CLASS",
	else: "ELSE",
	false: "FALSE",
	for: "FOR",
	fun: "FUN",
	if: "IF",
	nil: "NIL",
	or: "OR",
	print: "PRINT",
	return: "RETURN",
	super: "SUPER",
	this: "THIS",
	true: "TRUE",
	var: "VAR",
	while: "WHILE",
};

const DIGITS = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

class Token {
	constructor(type, lexeme, literal, line) {
		this.type = type;
		this.lexeme = lexeme;
		this.literal = literal;
		this.line = line;
	}

	toString() {
		return `${this.type} ${this.lexeme} ${this.literal}`;
	}
}

class Scanner {
	#tokens = [];
	#errors = [];
	#column = 0;

	#current = 0;
	#line = 1;
	#start = 0;
	#src = "";

	constructor(src = "") {
		this.#src = src;
	}

	logTokens() {
		console.log(this.#tokens, "--TOKENS--");
	}

	logErrors() {
		console.log(this.#errors, "--ERRORS--");
	}

	#isAtEnd() {
		return this.#current >= this.#src.length;
	}

	#get_char(idx) {
		return this.#src.charAt(idx);
	}

	/**
	 * Gets char at current index
	 */
	#get_current_char() {
		return this.#get_char(this.#current);
	}

	#get_next_char() {
		return this.#get_char(this.#current + 1);
	}

	#get_token() {
		return this.#src.substring(this.#start, this.#current);
	}

	#addToken(type, literal = null) {
		const token_text = this.#get_token();
		this.#tokens.push(new Token(type, token_text, literal, this.#line));
	}

	/**`
	 * Checks character at current position
	 * - If matches expected - returns true and moves to next position
	 * - Else return false and stays at current position
	 * @param {string} expected
	 */
	#match(expected) {
		if (this.#isAtEnd()) {
			return false;
		}
		if (this.#get_current_char() !== expected) {
			return false;
		}
		this.#move();
		return true;
	}
	// str.match(/[a-z]/i)

	#is_alpha(c) {
		return c.match(/[a-z]/i) || c === "_";
	}

	#is_alpha_numeric(c) {
		return this.#is_alpha(c) || this.#is_digit(c);
	}

	/**
	 * Find till we found the char or reach the end
	 * - Modifies current
	 * @param {string} char
	 * @param {()=> void} [iter]
	 */
	#find_till(char, iter) {
		while (this.#get_current_char() !== char && !this.#isAtEnd()) {
			iter?.();
			this.#move();
		}
	}

	/**
	 * Keep moving till you finding numbers
	 */
	#find_till_numbers() {
		while (this.#is_digit(this.#get_current_char())) {
			this.#move();
		}
	}

	#found_new_line() {
		this.#line += 1;
		this.#column = 0;
	}

	#move() {
		this.#current += 1;
		this.#column += 1;
	}

	// MEDIUM LEVEL
	#get_string() {
		const iter = () => {
			if (this.#get_current_char() === "\n") {
				this.#found_new_line();
			}
		};
		this.#find_till('"', iter);
		if (this.#isAtEnd()) {
			this.#errors.push({ line: this.#line, column: this.#column, text: "Unterminated string." });
			return;
		}

		// The closing ".
		this.#move();

		// Trim the surrounding quotes.
		const value = this.#src.substring(this.#start + 1, this.#current - 1);
		this.#addToken(TOKENS.STRING, value);
	}

	#is_digit(c) {
		return DIGITS.has(c);
	}

	#get_number() {
		this.#find_till_numbers();

		// Look for a fractional part.
		if (this.#get_current_char() === "." && this.#is_digit(this.#get_next_char())) {
			this.#move();
			this.#find_till_numbers();
		}
		// '312.' or '169.23' or '786'

		const number_as_string = this.#get_token();
		const value = Number(number_as_string);
		this.#addToken(TOKENS.NUMBER, value);
	}

	#get_reserved_keyword() {
		while (this.#is_alpha_numeric(this.#get_current_char())) {
			this.#move();
		}

		const text = this.#get_token();
		let type = IDENTIFIERS[text] || TOKENS.IDENTIFIER;
		this.#addToken(type);
		// if reserverd keyword -- we can use type to infer all info about keyword
		// if not -- lexeme would be string value of text
	}

	#scanToken() {
		const c = this.#get_current_char();
		this.#move();

		switch (c) {
			case '"': {
				this.#get_string();
				break;
			}
			case "(": {
				this.#addToken(TOKENS.LEFT_PAREN);
				break;
			}

			case ")": {
				this.#addToken(TOKENS.RIGHT_PAREN);
				break;
			}

			case "{": {
				this.#addToken(TOKENS.LEFT_BRACE);
				break;
			}

			case "}": {
				this.#addToken(TOKENS.RIGHT_BRACE);
				break;
			}

			case ",": {
				this.#addToken(TOKENS.COMMA);
				break;
			}

			case ".": {
				this.#addToken(TOKENS.DOT);
				break;
			}

			case "-": {
				this.#addToken(TOKENS.MINUS);
				break;
			}

			case "+": {
				this.#addToken(TOKENS.PLUS);
				break;
			}

			case ";": {
				this.#addToken(TOKENS.SEMICOLON);
				break;
			}

			case "*": {
				this.#addToken(TOKENS.STAR);
				break;
			}
			case "!": {
				this.#addToken(this.#match("=") ? TOKENS.BANG_EQUAL : TOKENS.BANG);
				break;
			}
			case "=": {
				this.#addToken(this.#match("=") ? TOKENS.EQUAL_EQUAL : TOKENS.EQUAL);
				break;
			}
			case "<": {
				this.#addToken(this.#match("=") ? TOKENS.LESS_EQUAL : TOKENS.LESS);
				break;
			}
			case ">": {
				this.#addToken(this.#match("=") ? TOKENS.GREATER_EQUAL : TOKENS.GREATER);
				break;
			}
			case "/": {
				if (this.#match("/")) {
					// A comment goes until the end of the line.
					this.#find_till("\n");
				} else {
					this.#addToken(TOKENS.SLASH);
				}
			}
			case " ":
			case "\r":
			case "\t": {
				// Ignore whitespace.
				break;
			}

			case "\n": {
				this.#found_new_line();
				break;
			}
			default: {
				if (this.#is_digit(c)) {
					this.#get_number();
					break;
				} else if (this.#is_alpha(c)) {
					this.#get_reserved_keyword();
				} else {
					this.#errors.push({
						line: this.#line,
						column: this.#column,
						text: `Unexpected character ${c}`,
					});
				}
			}
		}
	}

	scanner() {
		while (!this.#isAtEnd()) {
			this.#scanToken();
			this.#start = this.#current;
		}
	}
}

const x = new Scanner(`
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
`);
x.scanner();
x.logTokens();
x.logErrors();
