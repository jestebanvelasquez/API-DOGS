const { DataTypes } = require('sequelize');



module.exports= (selqualize) =>{
    selqualize.define('Temperament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        }
    },
    {
        timestamps:false
    })
}