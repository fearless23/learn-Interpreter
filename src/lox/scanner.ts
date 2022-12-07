import { Token } from "./token.js";
import { TOKENS, IDENTIFIERS } from "./constants.js";
import { is_alphabet, is_alpha_numeric, is_digit } from "./helpers.js";
import { IToken, IError, TokenType, TokenLiteral, IIdentifierKey } from "./types.js";

export class Scanner {
	#tokens: Token[] = [];
	#errors: IError[] = [];

	#column: number = 0;
	#current: number = 0;
	#line: number = 1;
	#start: number = 0;
	#src: string;

	constructor(src: string) {
		this.#src = src;
	}

	#is_at_end() {
		return this.#current >= this.#src.length;
	}

	// 1. CHAR METHODS
	#get_char(idx: number) {
		return this.#src.charAt(idx);
	}

	#get_current_char() {
		return this.#get_char(this.#current);
	}

	#get_next_char() {
		return this.#get_char(this.#current + 1);
	}

	// 2. get current token
	#get_token() {
		return this.#src.substring(this.#start, this.#current);
	}

	#addToken(type: TokenType, literal: TokenLiteral = null) {
		const token_text = this.#get_token();
		const itoken: IToken = {
			type,
			lexeme: token_text,
			literal,
			line: this.#line,
		};
		this.#tokens.push(new Token(itoken));
	}

	/**`
	 * Checks character at current position
	 * - If matches expected - returns true and moves to next position
	 * - Else return false and stays at current position
	 * @param {string} expected - character to match with
	 */
	#match(expected: string) {
		if (this.#is_at_end()) {
			return false;
		}
		if (this.#get_current_char() !== expected) {
			return false;
		}
		this.#move();
		return true;
	}

	/**
	 * Find till we found the char or reach the end
	 * - Modifies current
	 */
	#find_till(char: string, iter?: () => void) {
		while (this.#get_current_char() !== char && !this.#is_at_end()) {
			iter?.();
			this.#move();
		}
	}

	/**
	 * Keep moving till you finding numbers
	 */
	#find_till_numbers() {
		while (is_digit(this.#get_current_char())) {
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
		if (this.#is_at_end()) {
			this.#errors.push({ line: this.#line, column: this.#column, text: "Unterminated string." });
			return;
		}

		// The closing ".
		this.#move();

		// Trim the surrounding quotes.
		const value = this.#src.substring(this.#start + 1, this.#current - 1);
		this.#addToken(TOKENS.STRING, value);
	}

	#get_number() {
		this.#find_till_numbers();

		// Look for a fractional part.
		if (this.#get_current_char() === "." && is_digit(this.#get_next_char())) {
			this.#move();
			this.#find_till_numbers();
		}
		// '312.' or '169.23' or '786'

		const number_as_string = this.#get_token();
		const value = Number(number_as_string);
		this.#addToken(TOKENS.NUMBER, value);
	}

	#get_reserved_keyword() {
		while (is_alpha_numeric(this.#get_current_char())) {
			this.#move();
		}
		const text = this.#get_token() as IIdentifierKey;
		const type = IDENTIFIERS[text] || TOKENS.IDENTIFIER;
		this.#addToken(type);
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
				if (is_digit(c)) {
					this.#get_number();
					break;
				} else if (is_alphabet(c)) {
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

	#scanner() {
		while (!this.#is_at_end()) {
			this.#scanToken();
			this.#start = this.#current;
		}
	}

	run(): { tokens: IToken[]; errors: IError[] } {
		this.#scanner();
		return {
			tokens: this.#tokens.map((i) => i.token),
			errors: this.#errors,
		};
	}
}
