const { isValidObjectId } = require("mongoose");
const { cloudinary } = require("../utils/cloudinary");
const Ecomproduct = require("../models/prodModels");

module.exports.allProduct_get = (req, res) => {
  Ecomproduct.find()
    .sort({ createdAt: -1 })
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.json({ error: "couldn't find products" });
    });
  // res.json({ home: "welcome to home page!" });
};
module.exports.singleproduct_get = (req, res) => {
  let { id } = req.params;
  if (isValidObjectId(id)) {
    Ecomproduct.findById(id)
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        res.json({ status: false, err: err.message });
      });
  } else {
    res.json({ error: "no such product" });
  }
  // res.json({ singleproduct: "single product page" });
};
module.exports.createproduct_post = async (req, res) => {
  // console.log(req.file);
  // if (req.file) {
  // console.log(req.body);
  //   console.log("this request has a file");
  // } else {
  //   console.log("this request doesn't have a file");
  // }
  //? steps to create a product
  // 1. upload the image to cloudinary
  let result = await cloudinary.uploader.upload(req.file.path, {
    folder: "cozy_product",
  });
  // console.log(result);
  // res.json(result);

  // 2. extract public_url and public_id from cloudinary success response
  let prodImg_id = result.public_id;
  let prodImg_url = result.secure_url;
  let { prodName, prodPrice, prodSnippet, prodDetails } = req.body;

  // 3. add public_url and public_id to meet productSchema requirement
  let toDb = {
    prodName,
    prodPrice,
    prodSnippet,
    prodDetails,
    prodImg_id,
    prodImg_url,
  };

  // 4. save to mongodb and send a json response
  let db = new Ecomproduct(toDb);
  db.save()
    .then()
    .then((ans) => {
      res.status(202).json(ans);
    })
    .catch((err) => {
      res.status(500).json({ error: "couldn't create product" });
    });

  // res.status(202).json({ create: "product created" });
};
module.exports.updateproduct_patch = async (req, res) => {
  let { prodName, prodPrice, prodSnippet, prodDetails, id } = req.body;
  // console.log(upd);
  // res.json({ update: upd, id });
  let upd = {};
  if (prodName) {
    upd["prodName"] = prodName;
  }
  if (prodPrice) {
    upd["prodPrice"] = prodPrice;
  }
  if (prodSnippet) {
    upd["prodSnippet"] = prodSnippet;
  }
  if (prodDetails) {
    upd["prodDetails"] = prodDetails;
  }
  console.log(upd);
  // res.status(202).json({ update: "product updated" });
  if (req.file) {
    // res.json({ res: "this request has a file", id, upd });
    //? to take to update to db
    //? cloudinary can't be updated directly like we do in mongodb so we first delete then update
    // 1. get product from db
    let toUpd = await Ecomproduct.findById(id);
    // 2. delete from cloudinary
    let remImg = await cloudinary.uploader.destroy(toUpd.prodImg_id);
    // 3. now using upload
    let newImg = await cloudinary.uploader.upload(req.file.path, {
      folder: "cozy_product",
    });
    // 4. add prodImg_id and prodImg_url to db
    upd["prodImg_id"] = newImg.public_id;
    upd["prodImg_url"] = newImg.secure_url;
    // 5. update to db
    Ecomproduct.findByIdAndUpdate(id, { $set: upd })
      .then((ans) => {
        res.json({ status: true });
      })
      .catch((err) => {
        res.json({ status: false });
      });
  } else {
    // res.json({ res: "this request doesn't have a file", id, upd });
    Ecomproduct.findByIdAndUpdate(id, { $set: upd })
      .then((ans) => {
        res.json({ status: true });
      })
      .catch((err) => {
        res.json({ status: false });
      });
  }
};
module.exports.deleteproduct = async (req, res, next) => {
  //get id
  let { id } = req.body;
  try {
    // res.json(req.body);
    // get product to delete
    let toDel = await Ecomproduct.findById(id);
    // res.json(toDel.prodImg_id);
    //remove from cloudinary
    let remImg = await cloudinary.uploader.destroy(toDel.prodImg_id);
    //now delete from db
    Ecomproduct.findByIdAndDelete(id)
      .then((ans) => {
        res.json(ans);
      })
      .catch((err) => {
        res.json(err.message);
      });
  } catch (error) {
    next(error);
  }
  // res.json({delete: "product deleted"});
};
module.exports.likes = (req, res) => {
  let { id, like } = req.body;
  Ecomproduct.findByIdAndUpdate(id, { $inc: { prodLikes: like } })
    .then((ans) => {
      res.status(202).json({ status: true });
    })
    .catch((err) => {
      res.status(500).json({ status: false });
    });
  // res.json({ id, like });
};
