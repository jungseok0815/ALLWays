module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define(
      'review',
      {
         num: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          
        },
        userId: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },

        reviewData: {
          type: DataTypes.STRING(100),
          allowNull: false,
          
        },
        reviewText: {
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

