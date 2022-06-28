const { Router } = require('express');
const Dogs = require('./dogsRoutes/dogs.js')
const Temperaments = require('./temperamentRoutes/temperament.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', Dogs);
router.use('/temperament', Temperaments);


module.exports = router;
