const express = require('express');
const router = express.Router();

// Users http functions
const usersHttpHandler = require('./auth.http');

// Login route
router.route('/login')
    .post(usersHttpHandler.userLogin);

router.route('/signup')
    .post(usersHttpHandler.registerUser);


exports.router = router;