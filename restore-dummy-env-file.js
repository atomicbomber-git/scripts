// Copies .env.example to .env

const fs = require(`fs`)

fs.copyFileSync(`.env.example`, `.env`)
console.info(`Successfully replaced .env with .env.example.`)
