// Copies the appropriate .env.* .env files depending
// on command line argument

const fs = require("fs")

const ALLOWED_ENV_NAMES = [
    "development",
    "production"
]

const argv = process.argv

if (argv.length < 3) {
    console.error(`At least 1 argument is needed.`)
    process.exit(1)
}
//
const sourceEnvName = argv[2].toLowerCase()

if (!ALLOWED_ENV_NAMES.includes(sourceEnvName)) {
    console.error(`Allowed values are: ${ALLOWED_ENV_NAMES.join(" | ")}`)
    process.exit(1)
}

const sourceEnvFilename = `.env.${sourceEnvName}`
const targetEnvFilename = `.env`

if (!fs.existsSync(sourceEnvFilename)) {
    console.error(`The file ${sourceEnvFilename} can't be found in the current directory.`)
    process.exit(1)
}

fs.copyFileSync(sourceEnvFilename, targetEnvFilename)

console.info(`Successfully copied ${sourceEnvFilename} to ${targetEnvFilename}.`)

