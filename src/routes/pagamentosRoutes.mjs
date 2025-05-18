import { Router } from 'express'
import PagamentosController from '../controllers/pagamentosController.mjs'

const routes = Router()

routes.post('/pagamentos', PagamentosController.criarPagamento)
routes.patch('/:id/status', PagamentosController.atualizarStatusPagamento)
routes.get('/', PagamentosController.listarPagamentos)
routes.delete('/:id', PagamentosController.excluirPagamentos)

export default routes

