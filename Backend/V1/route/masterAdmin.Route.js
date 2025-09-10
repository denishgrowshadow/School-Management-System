// routes/masterAdmin.Router.js
const express = require('express');
const masterValidation = require('../validator/masterAdmin.Validator');
const masterController = require('../controller/masterAdmin.Controller');
const router = express.Router();

// Create a MasterAdmin
router.post('/', masterValidation.register, masterController.registerGraphQL);

// Login a MasterAdmin
router.post('/login', masterValidation.login, masterController.loginGraphQL);

// Get all MasterAdmins
router.get('/', masterController.getAllMasterAdmins);

// Get a single MasterAdmin by ID
router.get('/:id', masterController.getMasterAdminById);

// Update a MasterAdmin
router.put('/:id', masterValidation.update, masterController.updateMasterAdmin);

// Delete a MasterAdmin
router.delete('/:id', masterController.deleteMasterAdmin);

module.exports = router;