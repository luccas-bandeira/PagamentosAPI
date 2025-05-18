import Sequelize, { Model } from 'sequelize'
import sequelize from '../database/index.mjs' // ajuste o caminho conforme seu projeto

class Pagamento extends Model {
  static init(sequelizeInstance) {
    super.init(
      {
        codigoDebito: { type: Sequelize.INTEGER, allowNull: false },
        documentoPagador: { type: Sequelize.STRING, allowNull: false },
        metodoPagamento: {
          type: Sequelize.ENUM('boleto', 'pix', 'cartao_credito', 'cartao_debito'),
          allowNull: false,
        },
        numeroCartao: { type: Sequelize.STRING, allowNull: true },
        valor: { type: Sequelize.FLOAT, allowNull: false },
        status: {
          type: Sequelize.ENUM('PENDENTE', 'PROCESSADO_SUCESSO', 'PROCESSADO_FALHA'),
          defaultValue: 'PENDENTE',
        },
        ativo: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize: sequelizeInstance,
        tableName: 'pagamentos',
        timestamps: false, // adicione se você **não** usa `createdAt` e `updatedAt`
      }
    )
    return this
  }
}

Pagamento.init(sequelize)

export default Pagamento
