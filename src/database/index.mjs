import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './pagamentos.sqlite',
  logging: false,
});

export default sequelize;
