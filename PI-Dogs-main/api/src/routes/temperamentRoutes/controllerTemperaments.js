const axios = require('axios');
const { API_KEY } = process.env;
const {Op} = require('sequelize');
const {getDogsDB} = require('../dogsRoutes/controllerDogs')


const {
    Dog, Temperament
} = require('../../db');

const getAllTemps = async function(){
        let dataApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let tempApi = dataApi.data.map(temp => temp.temperament).toString().split(',')
        let temps = [...new Set(tempApi.sort())];//elimino los repetidos!
        temps.sort().map((temp) => {
            Temperament.findOrCreate({
                where: {name : temp}
            })
        })
        let allTDb = await Temperament.findAll()
        

        return allTDb
}

const getByTemp = async function(temperament) {

    try {
        let resultsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let resultsTempe = resultsApi.data.filter(x => x.temperament !== undefined);
        let resultsFil = resultsTempe.filter(x => x.temperament.includes(`${temperament}`));
        let apiTemps  = resultsFil.map(raza =>{
            return {
                id: raza.id,
                name: raza.name,
                bredFor: raza.bred_for,
                life_span: raza.life_span,
                weight: raza.weight.metric,
                height: raza.height.metric,
                image: raza.image.url,
                temperaments: raza.temperament
            }
        })
        let tempDB = await getDogsDB ();
        const filterTemps = tempDB.filter(d => d.temperaments.includes(`${temperament}`))



            const allByTemperament = [ ...filterTemps, ...apiTemps]
        return allByTemperament
        
    } catch (error) {
        return error
    }

}

module.exports = {
    getAllTemps,
    getByTemp
}