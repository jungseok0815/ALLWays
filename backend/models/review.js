module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define(
      'review',
      {
         num: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          
        },
        userid: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },

        place_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          
        },
        memo: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
      },
      {
        schema: 'userDatabase',
        timestamps: true,
      }
    );
  
    return review;
  };
  