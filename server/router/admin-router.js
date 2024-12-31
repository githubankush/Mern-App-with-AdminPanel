const express = require("express")
const allController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router()

router.route("/users").get(authMiddleware,adminMiddleware,allController.getAllUsers);
router.route("/users/:id").get(authMiddleware,adminMiddleware,allController.getUserById);
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,allController.updateUserById);

router.route("/contacts").get(authMiddleware,adminMiddleware,allController.getAllContacts);
router.route("/services").get(authMiddleware,adminMiddleware,allController.getAllServices);


router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,allController.deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,allController.deleteContactById);
module.exports = router;