import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/index.mjs';

class Pagamento extends Model {}

Pagamento.init({
  codigoDebito: DataTypes.INTEGER,
  identificadorPagador: DataTypes.STRING,
  metodoPagamento: DataTypes.STRING,
  numeroCartao: DataTypes.STRING,
  valor: DataTypes.FLOAT,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDENTE'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Pagamento',
  tableName: 'pagamentos',
  timestamps: false
});

export default Pagamento;
