const express = require('express');
const router = express.Router();

const adminsController = require('../controller/admins.Controller');
const adminValidation = require('../validator/admins.Validator');
const { verifyToken } = require('../middleware/auth.Middleware');


router.post('/create', verifyToken, adminValidation.register, adminsController.RegisterAdmins);// ✅ Create Admin — Only super-admins can create admins

router.post('/login', verifyToken, adminValidation.login, adminsController.AdminloginGraphQL);// ✅ Admin Login — Public

router.get('/', verifyToken, adminsController.getAllAdmins);// ✅ Get All Admins — Only super-admins

router.get('/:id', verifyToken, adminsController.getAdminByID); // ✅ Get Admin by ID — Only super-admins

router.put('/:id', verifyToken, adminValidation.update, adminsController.updateAdmin); // ✅ Update Admin by ID — Only super-admins

router.delete('/:id', verifyToken, adminsController.deleteAdmin); // ✅ Delete Admin by ID — Only super-admins

module.exports = router;
