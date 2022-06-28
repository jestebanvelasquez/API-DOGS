require('dotenv').config();
const {Op} = require('sequelize')
const { API_KEY } = process.env;
const { default: axios } = require('axios');
const {Router} = require ('express');
const router = Router();
const {Temperament,Dog} = require('../../db')
const {
getAllTemps, getByTemp
} = require('./controllerTemperaments')


//-------------------------------- Get/ = http://localhost:3002/temperament --------------------------------//

router.get('/', async (req, res, next) => {
    try {
        let allTDb = await getAllTemps()
        res.status(200).json({data:allTDb})

    } catch (error) {
        next(error)
    }
    
})



//-------------------------------- Get/temp = http://localhost:3003/temperament/temperament?temperament=Agile --------------------------------//

router.get('/temperament', async( req, res, next )=>{
    const {temperament} = req.query
    try {
        // if(!temperament) {res.status(400).json({message:'no hay datos'})};
        const apiTemps = await getByTemp(temperament)
        
        // let allTemps = [...tempsDb, ...apiTemps]
        res.status(200).json({data:apiTemps})        

    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router;