const express = require('express');
const router = express.Router();
const mainController = require('../app/controlers/main');

router.get('/', mainController.index);
router.get('/sobre', mainController.sobre);

module.exports = router;