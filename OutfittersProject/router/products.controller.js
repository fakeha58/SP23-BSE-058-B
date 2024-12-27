const express = require("express");
const Products = require("../models/product.model");


let router = express.Router();

router.get("/admin/products" ,async (req,res) => {
//   let product = await Products.find();
//   return res.render("admin/products", {
//     layout: "adminlayout",
//     pageTitle: "Dashboard",
//     product,
//   });

    res.send("hello");
})

router.get("/admin/product/create", (req,res) => {
  return res.render("admin/product-form", {
    layout: "adminlayout",
    pageTitle: "Create your Products",
  });
});

router.post("/admin/product/create", async(req,res) => {
  let data = req.body;
  let pds = new Products(data);

  pds.title = data.title;
  await pds.save();
  return res.redirect("/admin/products");
});

router.post("/admin/product/edit/:id" , async(req,res) => {
  let product = await Products.findById(req.params.id);
  product.title = req.body.title;
  product.price = req.body.price;
  product.description = req.body.description;

  await product.save();
  return res.redirect("/admin/products");
});

router.get("/admin/product/edit/:id" , async(req,res) => {
  let product = await Products.findById(req.params.id);
    
    return res.render("admin/product-edit-form",
    {
        layout : "adminlayout",
        title: "Edit Your Products",
        product,
    });
});

router.get("/admin/product/delete/:id", async(req,res) => {
  let product = await Products.findByIdAndDelete(req.params.id);

  return res.redirect("/admin/products");
})


// let Product = require("../../models/product.model");

// // route to handle Delete of product
// router.get("/admin/products/delete/:id", async (req, res) => {
//   let params = req.params;
//   let product = await Product.findByIdAndDelete(req.params.id);
//   // let query = req.query;
//   // return res.send({ query, params });
//   // return res.send(product);
//   return res.redirect("/admin/products");
// });

// //route to render edit product form
// router.get("/admin/products/edit/:id", async (req, res) => {
//   let product = await Product.findById(req.params.id);
//   return res.render("admin/product-edit-form", {
//     layout: "adminlayout",
//     product,
//   });
// });
// router.post("/admin/products/edit/:id", async (req, res) => {
//   let product = await Product.findById(req.params.id);
//   product.title = req.body.title;
//   product.description = req.body.description;
//   product.price = req.body.price;
//   await product.save();
//   return res.redirect("/admin/products");
// });

// // route to render create product form
// router.get("/admin/products/create", (req, res) => {
//   return res.render("admin/product-form", { layout: "adminlayout" });
// });

// //route to handle create product form submission
// // demonstrates PRG Design Pattern (Post Redirect GET)
// router.post(
//   "/admin/products/create",
//   upload.single("file"),
//   async (req, res) => {
//     // return res.send(req.file);
//     let data = req.body;
//     let newProduct = new Product(data);
//     newProduct.title = data.title;
//     if (req.file) {
//       newProduct.picture = req.file.filename;
//     }
//     await newProduct.save();
//     return res.redirect("/admin/products");
//     // we will send data to model to save in db

//     // return res.send(newProduct);
//     // return res.render("admin/product-form", { layout: "adminlayout" });
//   }
// );

// router.get("/admin/products", async (req, res) => {
//   let page = req.params.page;
//   page = page ? Number(page) : 1;
//   let pageSize = 1;
//   let totalRecords = await Product.countDocuments();
//   let totalPages = Math.ceil(totalRecords / pageSize);
//   // return res.send({ page });
//   let products = await Product.find()
//     .limit(pageSize)
//     .skip((page - 1) * pageSize);

//   return res.render("admin/products", {
//     layout: "adminlayout",
//     pageTitle: "Manage Your Products",
//     products,
//     page,
//     pageSize,
//     totalPages,
//     totalRecords,
//   });
// });





module.exports = router;