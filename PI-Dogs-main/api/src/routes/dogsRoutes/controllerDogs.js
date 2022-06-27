const axios = require('axios');
const { API_KEY } = process.env;
const {Op} = require('sequelize');

const {
    Dog, Temperament
} = require('../../db');


const getApiDogs = async function () {

    try {
        let allApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let razasApi = allApi.data.map((raza) => {
            return {
                id: raza.id,
                name: raza.name,
                bredFor: raza.bred_for,
                life_span: raza.life_span,
                weight: raza.weight.metric.split('-'),
                height: raza.height.metric.split('-'),
                image: raza.image.url,
                temperament: raza.temperament
            }
        });
        return razasApi

    } catch (error) {
        // return error;
        console.log(error)
    }

}

const getDogsDB = async function () {
    const allDB = await Dog.findAll({
        through: { attributes: [] },
        include: [
            {
                model: Temperament,
                through: { attributes: [] }
            }
        ]
    })
    const dbDogs = allDB.map(d =>{
        return {
            id: d.id,
            name: d.name,
            bredFor: d.bredFor,
            breedGroup: d.breedGroup,
            life_span: d.life_span,
            weight: `${d.wmin} - ${d.wmax}`,
            height: `${d.hmin} - ${d.hmax}`,
            image: d.image,
            temperaments: d.Temperaments.map(t => t.name)

        }
    })
    return dbDogs;
}



const getAllDogs = async function () {
    try {
        let dogsDB = await getDogsDB();
        let  dogsApi = await getApiDogs();
    
        const allDogs = [...dogsDB, ...dogsApi]
    
        return allDogs ///cambiar al crear uno !! 
        
    } catch (error) {
        return error
    }
}


const getDogsName = async function (name) {
    const element = name.charAt(0).toUpperCase() + name.slice(1);
    try {
        let allApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let byNameApi = allApi.data.filter(dog => dog.name.includes(`${element}`))
        let apiDog = byNameApi.map(raza => {
            return {
                id: raza.id,
                name: raza.name,
                bredFor: raza.bred_for,
                life_span: raza.life_span,
                weight: raza.weight.metric.split('-'),
                height: raza.height.metric.split('-'),
                image: raza.image.url,
                temperament: raza.temperament
            }
        })
        let dogsDb = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: [
                {
                    model: Temperament,
                    through: { attributes: [] }
                }
            ]
        });
        const allName = [...dogsDb, ...byNameApi];
        return allName;

    } catch (error) {
        return error
    }

}


const getId = async function (id) {

    if (id.length > 20) {
        let dogsDb = await Dog.findByPk(id, {
            include: [
                {
                    model: Temperament,
                    through: { attributes: [] }
                }
            ]
        });
        return dogsDb;

    }else{
        let allApi = await getApiDogs();
        const apiId = allApi.filter(dog => dog.id == id)
        return apiId;
    }

}



const postDog = async function (name, bredFor, life_span, height, weight, image, temperamentsts) {
    try {
        const newRaza = await Dog.create({
            name,
            urlName: name,
            bredFor,
            life_span,
            weight,
            height,
            image,
        })
        
        await newRaza.addTemperaments(temperaments)

        return newRaza;
    } catch (error) {
        return error
    }
}










module.exports = {
    getApiDogs,
    getDogsDB,
    getAllDogs,
    getDogsName,
    getId,
    postDog,
}