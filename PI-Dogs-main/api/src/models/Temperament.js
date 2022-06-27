const {DataType} = require("sequelize");


module.exports= (selqualize) =>{
    selqualize.define('Temperament', {
        name:{
            type: DataType.STRING,
            allowNull: false,
            unique:true
        }
    },
    {
        timestamps:false
    })
}