export interface PadNumberOptions {
	/** The number to pad. */
	number: number
	/** The string to pad the number with.. */
	fillString?: string
	/** The length to pad the number to. Must be equal or greater than 0. */
	padLength: number
	/** The side to pad the number from. */
	padFrom?: 'start' | 'end'
}
