import sequelize from './index.mjs'
import Pagamento from '../models/Pagamentos.mjs'

async function syncDatabase() {
  try {
    await sequelize.authenticate()
    console.log('Conexão estabelecida com sucesso.')

    // Inicializa o modelo (caso ainda não tenha feito)
    Pagamento.init(sequelize)

    // Cria as tabelas se não existirem
    await sequelize.sync({ alter: true }) // ou { force: true } para recriar
    console.log('Tabelas sincronizadas com sucesso.')
  } catch (error) {
    console.error('Erro ao sincronizar:', error)
  } finally {
    await sequelize.close()
  }
}

syncDatabase()
