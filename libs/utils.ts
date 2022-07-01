/**
 *
 * @param start : Number
 * @param end : Number
 * @returns Array<Number>
 *
 * Create a list of numbers between our start and our end
 */
export function range(start, end) {
	return Array.apply(0, Array(end - 1)).map((element, index) => index + start);
}

/**
 *
 * @param string: String
 * @returns string
 *
 *  Capitalize only this first letter
 */

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
