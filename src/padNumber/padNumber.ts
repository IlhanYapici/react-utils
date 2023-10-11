import { PadNumberOptions } from './padNumber-types'

/**
 * Pads a number with a fill string to a specified length.
 *
 * @example
 * 	const number = 1
 * 	const padLength = 3
 * 	const padFrom = 'start'
 * 	const fillString = '0'
 * 	const paddedNumber = padNumber({
 * 		number,
 * 		padLength,
 * 		padFrom,
 * 		fillString,
 * 	})
 * 	console.log(paddedNumber) // "001"
 *
 * @param {PadNumberOptions} options - The options object.
 * @returns {string} A string representing the padded number.
 */
export function padNumber(options: PadNumberOptions): string {
	const { number, fillString = '0', padLength, padFrom = 'start' } = options

	if (padFrom === 'start') {
		return String(number).padStart(padLength, fillString)
	} else {
		return String(number).padEnd(padLength, fillString)
	}
}
