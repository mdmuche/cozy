const express = require("express");
const upload = require("../utils/multer");
const {
  singleproduct_get,
  allProduct_get,
  createproduct_post,
  updateproduct_patch,
  deleteproduct,
  likes,
} = require("../controllers/productControllers");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// product routes
router.get("/allproduct", requireAuth, allProduct_get);
router.get("/singleproduct/:id", singleproduct_get);
router.post("/createproduct", upload.single("prodImg"), createproduct_post);
router.patch("/updateproduct", upload.single("prodImg"), updateproduct_patch);
router.post("/deleteproduct", deleteproduct);
router.post("/likes", likes);
router.get("*", (req, res) => {
  res.status(404).json({ error: "oops! page doesn't exist" });
});

//! no route zone

module.exports = router;
