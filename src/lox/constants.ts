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
	// rome-ignore lint/correctness/noUndeclaredVariables: <explanation>
} as const;

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
	// rome-ignore lint/correctness/noUndeclaredVariables: <explanation>
} as const;

const DIGIT_SET = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

export { TOKENS, IDENTIFIERS, DIGIT_SET };
