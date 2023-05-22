const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Favorites = require('./favorites')(sequelize, Sequelize);
//테이블관의 관계 정의
// db.User.hasMany(Favorites, { as: 'Favorites', foreignKey: 'id' });
// db.Favorites.belongsTo(User, { as: 'User', foreignKey: 'id' });

sequelize.sync();

module.exports = db;
