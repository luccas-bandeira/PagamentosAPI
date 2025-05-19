// node src/sync.mjs rodar para criar o bd
import sequelize from './database/index.mjs';
import Pagamento from './models/Pagamentos.mjs';

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco sincronizado com sucesso.');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao sincronizar banco:', err);
    process.exit(1);
  }
}

syncDatabase();
