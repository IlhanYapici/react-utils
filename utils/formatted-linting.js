#!/usr/bin/env node

const chalk = require('chalk')
const { ESLint } = require('eslint')
const minimist = require('minimist')
const path = require('path')

const baseConfig = require('../.eslintrc.json')

module.exports = (async () => {
	const args = minimist(process.argv.slice(2))
	const eslint = new ESLint({
		baseConfig: {},
		fix: args.fix ?? false,
		cwd: process.cwd(),
	})
	const formatter = await eslint.loadFormatter('stylish')

	console.log('> ESLint has loaded config from: .eslintrc.json')

	let filesDir = []

	if (args.dir) {
		filesDir = []
			.concat(args.dir)
			.map((item) => path.resolve(process.cwd(), item))
	} else {
		filesDir = ['src/']
	}

	console.log(
		`> ESLint will lint${
			args.fix ? ' and fix' : ''
		} the following directories: ${filesDir}\n`,
	)

	const results = await eslint.lintFiles(filesDir)

	if (args.fix) {
		await ESLint.outputFixes(results)

		if (results.some((result) => result.output)) {
			console.log(
				chalk.bold.greenBright('✅ ESLint has fixed all fixable errors.\n'),
			)
		} else {
			console.log(
				chalk.bold.yellowBright('⚠️  ESLint has found no fixable errors.\n'),
			)
		}

		return
	}

	if (!args.fix && results.some((result) => result.errorCount > 0)) {
		const failed = results.filter((result) => result.errorCount > 0)
		const multipleErrors = failed.length > 1 ? 's' : ''

		console.log(
			chalk.bold.redBright(
				`❌  ESLint has found ${failed.length} error${multipleErrors}.`,
			),
		)

		console.log(formatter.format(results))

		process.exit(1)
	}

	console.log(
		chalk.bold.greenBright('✅ ESLint finished without any errors.\n'),
	)
})().catch((error) => {
	process.exitCode = 1
	console.error(error)
})
