import { DIGIT_SET } from "./constants.js";

const is_digit = (c: string) => DIGIT_SET.has(c);
const is_alphabet = (c: string) => c.match(/[a-z]/i) || c === "_";
const is_alpha_numeric = (c: string) => is_digit(c) || is_alphabet(c);

export { is_alphabet, is_alpha_numeric, is_digit };
