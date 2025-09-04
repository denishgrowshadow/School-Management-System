const express = require('express');
const router = express.Router();
const parentController = require('../controller/parent.Controller');

// Register
router.post('/register', parentController.registerParent);

// Login
router.post('/login', parentController.loginParent);

// Get All
router.get('/', parentController.getAllParents);

// Get by ID
router.get('/:id', parentController.getParentById);

// Update
router.put('/:id', parentController.updateParent);

// Delete
router.delete('/:id', parentController.deleteParent);

module.exports = router;
