import { TOKENS, IDENTIFIERS } from "./constants.js";

type ITokenKey = keyof typeof TOKENS;
export type ITokenType = typeof TOKENS[ITokenKey];

export type IIdentifierKey = keyof typeof IDENTIFIERS;
export type IIdentifierType = typeof IDENTIFIERS[IIdentifierKey];

export type TokenType = ITokenType | IIdentifierType;
export type TokenLiteral = string | null | number | boolean;

export interface IToken {
	type: TokenType;
	lexeme: string;
	literal: TokenLiteral;
	line: number;
}

export interface IError {
	line: number;
	column: number;
	text: string;
}
