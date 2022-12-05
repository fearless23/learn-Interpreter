const LINE_TYPES = {
	ASSIGNMENT: "ASSIGNMENT",
	ARITMETIC: "ARITMETIC",
};

// const ARITHMETIC_TYPES = {
// 	VARIABLE: "VARIABLE",
// 	SYMBOL: "SYMBOL",
// 	NUMBER: "NUMBER",
// };

const from_value_to_rhs = (type, value) => {
	if (type === LINE_TYPES.ASSIGNMENT) {
		return String(value);
	}
	// mathematical operation
	return value.map((i) => i.value).join(" ");
};

const ir_to_line = (ir) => {
	const { type, variable, value } = ir;
	return `const ${variable} = ${from_value_to_rhs(type, value)};`;
};

// const merge_lines = (irs = []) => {
// 	const lines = irs.map(ir_to_line);
// 	return lines.join("\n");
// };

export { ir_to_line };
