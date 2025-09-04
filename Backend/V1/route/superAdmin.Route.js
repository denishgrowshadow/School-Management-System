const express = require('express');
const router = express.Router();

const superAdminController = require('../controller/superAdmin.Controller');
const { verifyToken, isMasterAdmin } = require('../middleware/auth.Middleware');
const superAdminValidator = require('../validator/superAdmin.validation');


router.post('/create', verifyToken, superAdminValidator.register, superAdminController.createSuperAdmin); // Create SuperAdmin — only master-admin can create

router.post('/login', verifyToken, superAdminValidator.login, superAdminController.loginGraphQL);// Login SuperAdmin — public route

router.get('/', verifyToken, superAdminController.getAllSuperAdmins); // Get all SuperAdmins — protected route

router.get('/:id', verifyToken, superAdminController.getSuperAdminById); // Get SuperAdmin by ID — protected route  

router.put('/:id', verifyToken, superAdminValidator.update, superAdminController.updateSuperAdmin); // Update SuperAdmin by ID — protected route

router.delete('/:id', verifyToken, superAdminController.deleteSuperAdmin);  // Delete SuperAdmin by ID — protected route

module.exports = router;
