const { Sequelize } = require('sequelize');
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require('../config/config.default');
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
});

try {
  seq
    .authenticate()
    .then(() => {
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log(err);
}

module.exports = seq;
