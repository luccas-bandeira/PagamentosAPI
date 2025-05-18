import app from './src/app.mjs'

const port = process.env.PORT || 3336

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor escutando em http://localhost:${port}`)
})
