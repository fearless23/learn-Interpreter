// const error_payload = [
// 	{
// 		text: "unexpected ,",
// 		line: 34,
// 		column: 23,
// 		solution: "remove this comma",
// 	},
// 	{
// 		text: "unexpected ;",
// 		line: 12,
// 		column: 45,
// 		solution: "remove this semicolon or replace with .",
// 	},
// 	{
// 		text: "cannot subtract strings, a and b are strings",
// 		line: 8,
// 		column: 5,
// 		solution: "subtract is only valid for number",
// 	},
// ];

const line_data = {
	file_path: "./src/some_file.l",
	line_text: "const a => 3;,",
	line_number: 12,
	errors: [
		{
			text: "unexpected >",
			column: 10,
			solution: "remove > for = to work",
		},
		{
			text: "unexpected ,",
			column: 14,
			solution: "remove , after ;",
		},
	],
};

const show_error = ({ line_text, file_path, errors, line_number }) => {
	console.log("---------------------------------------");
	console.log(`Issue at line ${line_number} in '${file_path}'`);
	console.log(`> ${line_text}`);
	console.log("\n");
	// Assumption: sorted by column number
	errors.forEach(({ text, column, solution }, index) => {
		console.log(`Error ${index + 1}: ${text} at position ${column}`);
		console.log(`Solution: ${solution}`);
		console.log("\n");
	});
};

show_error(line_data);
