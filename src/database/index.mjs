import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./pagamentos.sqlite"
});

export default sequelize;
