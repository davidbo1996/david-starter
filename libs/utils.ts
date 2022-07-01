/**
 *
 * @param end : Number
 * @returns Array<Number>
 *
 * Create a list of numbers between our start and our end
 */
export function range(end: number): Array<Number> {
	return Array.from(Array(end).keys());
}
