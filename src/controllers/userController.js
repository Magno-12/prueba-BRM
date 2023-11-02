const userService = require('../services/userService');

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
exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

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
exports.updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const message = await userService.updateUserInfo(userId, updatedData);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

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
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const message = await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @api {get} /users/:id/purchase-history Get Purchase History
 * @apiName GetPurchaseHistory
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {Object[]} history Purchase history of the user.
 * @apiSuccess {Number} history.purchaseId Purchase ID.
 * @apiSuccess {String} history.date Purchase date.
 * @apiSuccess {Object[]} history.products Products purchased.
 * @apiSuccess {Number} history.products.productId Product ID.
 * @apiSuccess {String} history.products.productName Product name.
 * @apiSuccess {Number} history.products.quantity Quantity purchased.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "purchaseId": 1,
 *       "date": "2023-11-01",
 *       "products": [
 *         {
 *           "productId": 1,
 *           "productName": "Product 1",
 *           "quantity": 3
 *         },
 *         {
 *           "productId": 2,
 *           "productName": "Product 2",
 *           "quantity": 2
 *         }
 *       ]
 *     }
 *   ]
 */
exports.getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.params.id;
    const authenticatedUserId = req.userId;

    if (authenticatedUserId !== userId) {
      throw new Error('Permission denied');
    }

    const user = await userService.getUserInfo(userId);
    if (user.role === 'client') {
      throw new Error('Permission denied');
    }

    const history = await userService.getPurchaseHistory(userId);
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: error.message });
  }
};
