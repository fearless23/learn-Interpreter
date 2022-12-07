import { IToken } from "./types.js";

export class Token {
	#token: IToken;
	constructor(token: IToken) {
		this.#token = token;
	}

	toString() {
		const { type, lexeme, literal } = this.#token;
		return `${type} ${lexeme} ${literal}`;
	}
	get token() {
		return this.#token;
	}
}
