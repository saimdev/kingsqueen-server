const router = require("express").Router();
const adminValidators = require("../middlewares/validators/admin");
const adminControllers = require("../api/admin/controllers");
const upload = require("../config/multer");
const adminAuthenticate = require("../middlewares/adminAuthenticate");

router.post("/authenticate", adminAuthenticate, (req, res, _next) => {
  res.status(200).json({
    ok: true,
    data: req.admin,
  });
});

router.post("/logout", (req, res, next) => {
  res.clearCookie("_auth_admin");
  res.status(200).json({ message: "Logout success" });
});

router.route("/login").post(adminControllers.login);

router
  .route("/products")
  .get(adminControllers.getAllProducts)
  .post(
    adminAuthenticate,
    upload.array("images"),
    adminValidators.product(),
    adminControllers.createProduct
  );

router
  .route("/products/discounted")
  .get(adminControllers.getAllDiscountedProduct);

router
  .route("/products/:id")
  .get(adminControllers.getSingleProduct)
  .patch(
    adminAuthenticate,
    upload.array("images"),
    adminValidators.product(),
    adminControllers.editProduct
  )
  .delete(adminAuthenticate, adminControllers.deleteProduct);

router
  .route("/categories")
  .get(adminControllers.getAllCategories)
  .post(adminAuthenticate, adminControllers.createCategory);

router
  .route("/categories/:id")
  .all(adminAuthenticate)
  .get(adminControllers.getCategory)
  .patch(adminControllers.editCategory)
  .delete(adminControllers.deleteCategory);

router.route("/orders").get(adminControllers.getAllOrders);

router
  .route("/orders/:id")
  .get(adminControllers.getOrder)
  .patch(adminAuthenticate, adminControllers.editOrder)
  .delete(adminAuthenticate, adminControllers.deleteOrder);

router
  .route("/dashboard")
  .all(adminAuthenticate)
  .get(adminControllers.getDashboard);

module.exports = router;
