const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  urlName: {
    type: DataTypes.STRING,
    allowNull: false
  },
    bredFor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull:false
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    image: {
      type:DataTypes.TEXT,
    },
    route:{
      type: DataTypes.VIRTUAL,
      get(){
        return `/dogs/${this.urlName}`;
      }
    }
  },
  {
    timestamps:false,
    createdAt: false,
    updatedAt: 'actualizado'
  });
};



