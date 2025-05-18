import express from 'express'
import routes from './routes/pagamentosRoutes.mjs'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)

    // Middleware de erro
    this.server.use((err, req, res, next) => {
      if (err instanceof Error) {
        return res.status(400).json({
          error: err.message,
        })
      }

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
      })
    })
  }
}

export default new App().server
