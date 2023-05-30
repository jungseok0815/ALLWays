const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

const db = {};
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Favorites = require('./favorites')(sequelize, Sequelize);
//테이블관의 관계 정의
 db.User.hasMany(db.Favorites, { foreignKey: 'id', sourceKey:"id" });
 db.Favorites.belongsTo(db.User, { foreignKey: 'id', targetKey:"id" });

sequelize.sync();

module.exports = db;
