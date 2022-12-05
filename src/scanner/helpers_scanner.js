const LINE_TYPES = {
	ASSIGNMENT: "ASSIGNMENT",
	ARITMETIC: "ARITMETIC",
};

const ARITHMETIC_TYPES = {
	VARIABLE: "VARIABLE",
	SYMBOL: "SYMBOL",
	NUMBER: "NUMBER",
};

const ARITMETIC_SYMBOLS = new Set(["+", "-", "/", "*"]);
const is_aritmetic_symbol = (i) => ARITMETIC_SYMBOLS.has(i);

const get_lines = (text = "") => {
	return text
		.split("\n")
		.map((i) => i.trim())
		.filter((i) => !!i);
};

const variables_defined = new Map();

const parse_aritmetic_operation = (aritmetic_operation = []) => {
	return aritmetic_operation.map((a_token) => {
		const is_variable = variables_defined.has(a_token);
		const type = is_variable
			? ARITHMETIC_TYPES.VARIABLE
			: is_aritmetic_symbol(a_token)
			? ARITHMETIC_TYPES.SYMBOL
			: ARITHMETIC_TYPES.NUMBER;
		let value = a_token;
		if (type === "NUMBER") {
			value = Number(a_token);
		}
		// if (type === "SYMBOL") value = a_token;
		// if (type === "VARIABLE") value = a_token;
		return { type, value };
	});
};

const parse_line = (line = "") => {
	const [_, variable, __, ...arithmetic_or_number] = line.slice(0, line.length - 1).split(" ");
	const is_assigment = arithmetic_or_number.length === 1;
	const type = is_assigment ? LINE_TYPES.ASSIGNMENT : LINE_TYPES.ARITMETIC;
	const value = is_assigment
		? Number(arithmetic_or_number[0])
		: parse_aritmetic_operation(arithmetic_or_number);
	variables_defined.set(variable, { variable, value, type });
	return { variable, type, value };
};

export { get_lines, parse_line };
