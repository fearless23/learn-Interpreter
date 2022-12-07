import { ir_to_line } from "./ir_helpers.js";

const irs = [
	{
		variable: "a",
		type: "ASSIGNMENT",
		value: 3,
	},
	{
		variable: "b",
		type: "ASSIGNMENT",
		value: 4,
	},
	{
		variable: "c",
		type: "ARITMETIC",
		value: [
			{
				type: "VARIABLE",
				value: "a",
			},
			{
				type: "SYMBOL",
				value: "+",
			},
			{
				type: "VARIABLE",
				value: "b",
			},
			{
				type: "SYMBOL",
				value: "+",
			},
			{
				type: "NUMBER",
				value: 5,
			},
		],
	},
	{
		variable: "d",
		type: "ARITMETIC",
		value: [
			{
				type: "VARIABLE",
				value: "c",
			},
			{
				type: "SYMBOL",
				value: "-",
			},
			{
				type: "NUMBER",
				value: 34,
			},
		],
	},
];

const lines = irs.map(ir_to_line);
const output = lines.join("\n");
console.log("---PROGRAM START---");
console.log(output);
console.log("---PROGRAM END---");
