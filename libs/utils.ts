/**
 *
 * @param   start: Number
 * @param end : Number
 * @returns Array<Number>
 *
 * Create a list of numbers between our start and our end
 */
export function range(start: number, end: number): Array<Number> {
	return Array(end - start + 1)
		.fill()
		.map((_, idx) => start + idx);
}
