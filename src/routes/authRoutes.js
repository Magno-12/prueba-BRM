/**
 * @api {post} /auth/register User Registration
 * @apiName RegisterUser
 * @apiGroup Authentication
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

/**
 * @api {post} /auth/login User Login
 * @apiName UserLogin
 * @apiGroup Authentication
 */
router.post('/login', authController.login);

module.exports = router;
