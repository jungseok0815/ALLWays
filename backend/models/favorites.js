module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define(
      'Favorites',
      {
      
        id: {
          primaryKey: true,
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        favorites: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        schema: 'userDatabase',
        timestamps: true,
      }
    );
  
    return Favorites;
  };
  