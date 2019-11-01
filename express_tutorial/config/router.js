const express = require('express');
const router = express.Router();
const mainController = require('../app/controlers/main');
const areaController = require('../app/controlers/area')
const cursoController = require('../app/controlers/curso')

// MainController
router.get('/', mainController.index);
router.get('/sobre', mainController.sobre);

// AreaController
router.get('/area', areaController.index)

// CursoController
router.get('/curso' , cursoController.index);
router.get('/curso/read/:id' , cursoController.read);
router.get('/curso/create' , cursoController.create);
router.post('/curso/create' , cursoController.create);
router.get('/curso/update/:id' , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.post('/curso/remove/:id' , cursoController.remove);

module.exports = router;
