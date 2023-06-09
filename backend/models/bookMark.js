module.exports = (sequelize, DataTypes) => {
    const bookMark = sequelize.define(
      'bookMark',
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
        place_url: {
          type: DataTypes.STRING(100),
          allowNull: false,
          
        },
        address_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          
        },
        phone: {
          type: DataTypes.STRING(100),
          allowNull: false,
          
        },
        x: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          
        },
        y: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          
        },
      },
      {
        schema: 'userDatabase',
        timestamps: true,
      }
    );
  
    return bookMark;
  };
  