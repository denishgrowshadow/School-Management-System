const express = require('express');
const masterValidation = require('../validator/masterAdmin.Validator');
const masterController = require('../controller/masterAdmin.Controller');
const router = express.Router();

router.post('/', masterValidation.register, masterController.registerGraphQL);
router.post('/login', masterValidation.login, masterController.loginGraphQL);


module.exports = router; 