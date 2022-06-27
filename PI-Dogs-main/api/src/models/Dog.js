const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,//user unique id
      defaultValue: DataTypes.UUIDV4,//necesary
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,// VARCHAR(255)
      allowNull: false,
      unique: true
    },
    family:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'Solitary'
    },
    weight:{
      type: DataTypes.STRING,
      allowNull:false
    },
    height:{
      type: DataTypes.STRING,
      allowNull:false
    },
    LifeExpec:{
      type: DataTypes.STRING,
      allowNull:true
    },
    image:{
      type:DataTypes.STRING,
      allowNull:true
    }
  },
  {
    timestamps:false,//no agregar fecha de creacion
  });
};
