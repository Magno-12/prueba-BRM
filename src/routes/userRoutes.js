const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @api {get} /users/:id Get User Information
 * @apiName GetUserInfo
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {Object} user User information.
 * @apiSuccess {Number} user.id User ID.
 * @apiSuccess {String} user.username Username of the user.
 * @apiSuccess {String} user.email Email of the user.
 * @apiSuccess {String} user.role Role of the user (admin or client).
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "username": "john_doe",
 *     "email": "john@example.com",
 *     "role": "client"
 *   }
 */
router.get('/:id', userController.getUserInfo);

/**
 * @api {put} /users/:id Update User Information
 * @apiName UpdateUserInfo
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID.
 * @apiParam {String} username New username for the user.
 * @apiParam {String} email New email for the user.
 * @apiParam {String} role New role for the user (admin or client).
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "User information updated successfully"
 *   }
 */
router.put('/:id', userController.updateUserInfo);

/**
 * @api {delete} /users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 204 No Content
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
