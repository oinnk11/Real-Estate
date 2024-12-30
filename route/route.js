const express = require('express');
const router = express.Router();

const controller = require('../controller/controller.js');
router.get('/login', controller.login);
router.post('/login', controller.loginsubmit);
router.get('/register', controller.register);
router.post('/register', controller.registersubmit);
router.get('/logout', controller.logout);
router.get('/dashboard', controller.dashboard);



module.exports = router;