require('dotenv').config();
const { Op } = require('sequelize')
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Dog, Temperament } = require('../../db.js')
const { API_KEY } = process.env;
const {
    getDogsDB,
    getAllDogs,
    getDogsName,
    getId,
    postDog,
} = require('./controllerDogs');



// //addHook
// Dog.addHook('beforeValidate', dog => {
    //     dog.urlName = dog.name && dog.name.replace(/\s+/g, '_').replace(/\W/g, '')// reemplazar el texto a Name_Dog...
    //   })
    


//-------------------------------- http://localhost:3002/dogs --------------------------------//

router.get('/', async (req, res, next) => {
    try {
        const allDogs = await getAllDogs()
        res.status(200).json({data:allDogs})
        console.log(allDogs)
    } catch (error) {
        next(error)
    }
})

//--------------------------------Get /DBall = http://localhost:3002/dogs/db --------------------------------//

router.get('/db', async (req, res, next) => {
    try {
        const allDogsDB = await getDogsDB()
        res.status(200).json({ data: allDogsDB })
    } catch (error) {
        next(error)
    }
})

// //-------------------------------- http://localhost:3002/dogs/name?name=Alaskan --------------------------------//

router.get('/name', async (req, res, next) => {
    const {name} = req.query
    try{
        let razas = await getDogsName (name)
        res.status(200).json({ data: razas })
    } catch (error) {
        console.log(razas)
        next(error)
    }
})

//-------------------------------- Get/:id = http://localhost:3002/dogs/9 --------------------------------//

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const dogId= await getId(id)
        res.status(200).json({ data: dogId })

    } catch (error) {
        next(error)
    }
})

// //-------------------------------- Post: http://localhost:3002/dogs --------------------------------//

router.post('/', async (req, res, next) => {
    const {  name, bredFor, life_span, height, weight, image, temperaments} = req.body
    try {
        const newDog = await postDog(name, bredFor, life_span, height, weight, image, temperaments)
        res.status(200).json({data:newDog});
        // res.redirect(newDog.route);
    } catch (error) {
        next(error);
    }
})




// //-------------------------------- Put/:id = http://localhost:3002/dogs/9 --------------------------------//

// router.put('/:idDog', async (req, res, next) => {
//     const idDog = req.params.idDog;

//     const { name, life_span, weight, height, image } = req.body
//     try {
//         let UpdDog = await Dog.update({
//             name,
//             life_span,
//             height,
//             weight,
//             image
//         }, {
//             where: {
//                 id: idDog
//             }
//         })

//         res.status(200).json({ data: UpdDog })

//     } catch (error) {
//         next(error);
//     }
// })

// //-------------------------------- Delete/:id = http://localhost:3002/dogs/idDb --------------------------------//

// router.delete('/:id', async (req, res, next) => {
//     const id = req.params.id
//     try {
//         await Dog.destroy({
//             where: { id }
//         })
//         res.status(204).json({ data: 'ok' })

//     } catch (error) {
//         next(error)
//     }
// })


module.exports = router;


