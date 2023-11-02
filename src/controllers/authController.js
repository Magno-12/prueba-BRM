const authService = require('../services/authService');
/**
 * @api {post} /auth/register User Registration
 * @apiName RegisterUser
 * @apiGroup Authentication
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {Object} user Registered user.
 * @apiSuccess {String} user.username User's username.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "user": {
 *         "username": "john_doe"
 *       }
 *     }
 *
 * @apiError RegistrationFailed User registration failed.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "User registration failed"
 *     }
 */

exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await authService.registerUser(userData);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @api {post} /auth/login User Login
 * @apiName UserLogin
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} token Access token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "my-access-token"
 *     }
 *
 * @apiError AuthenticationFailed Authentication failed.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authentication failed"
 *     }
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};
