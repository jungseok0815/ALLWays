// index.js

const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

const db = {};
db.sequelize = sequelize;
db.bookMark = sequelize;
db.review = sequelize;
db.User = sequelize;


db.User = require('./user')(sequelize, Sequelize);
db.bookMark = require('./bookMark')(sequelize, Sequelize);
db.review = require('./review')(sequelize, Sequelize);
//테이블관의 관계 정의
 db.User.hasMany(db.bookMark, { foreignKey: 'userid', sourceKey:"id" });
 db.bookMark.belongsTo(db.User, { foreignKey: 'userid', targetKey:"id" });
 
 db.User.hasMany(db.review, { foreignKey: 'userid', sourceKey:"id" });
 db.review.belongsTo(db.User, { foreignKey: 'userid', targetKey:"id" });

sequelize.sync();

module.exports = db;