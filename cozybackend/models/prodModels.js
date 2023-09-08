const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    prodName: {
      type: String,
      regiured: [true, "name must be a string"],
    },
    prodPrice: {
      type: String,
      required: [true, "price must be a string"],
    },
    prodSnippet: {
      type: String,
      required: [true, "expects a string type"],
    },
    prodDetails: {
      type: String,
      required: [true, "expects a string type"],
    },
    prodImg_url: {
      type: String,
      required: [true, "expects a string type"],
    },
    prodImg_id: {
      type: String,
      required: [true, "expects a string type"],
    },
    prodLikes: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Ecomproduct = new mongoose.model("ecomproduct", productSchema);

module.exports = Ecomproduct;
