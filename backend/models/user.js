module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        num: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          
        },
        id: {
          type: DataTypes.STRING(45),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        realname: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        schema: 'userDatabase',
        timestamps: true,
      }
    );
  
    return User;
  };
  