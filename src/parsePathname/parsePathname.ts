/**
 * Take a pathname as parameter and return a string array.
 *
 * @example
 * 	const pathname = '/path/to/somewhere'
 * 	const parsedPathname = parsePathname(pathname)
 * 	console.log(parsedPathname) // ["path", "to", "somewhere"]
 *
 * @param {string} pathname - The input pathname to be parsed.
 * @returns {string[]} An array of strings representing the parsed pathname.
 */
export function parsePathname(pathname: string): string[] {
	return pathname.split('/').filter((i) => i)
}
