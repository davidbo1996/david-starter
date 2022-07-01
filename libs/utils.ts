/**
 *
 * @param start : Number
 * @param end : Number
 *
 * @returns Array<Number>
 *
 * Create a list of numbers between our start and our end
 */
export function range(start, end) {
	return Array.apply(0, Array(end - 1)).map((element, index) => index + start);
}
