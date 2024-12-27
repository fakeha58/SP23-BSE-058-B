const express = require("express");
const mongoose = require("mongoose");
const app = express();

let layout = require("express-ejs-layouts");
app.use(layout);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));



let ProductsTable = require("./Routes/Admin/products.controller");
app.use(ProductsTable);


const Order = require("./models/order.model"); // Import the order model

app.get("/checkout", (req, res) => {
    let cart = req.cookies.cart || [];
    let products = []; 
    if (cart.length > 0) {
      products = Product.find({ _id: { $in: cart } });
    }
    return res.render("checkout", { products });
  });



app.post("/checkout", async (req, res) => {
    let cart = req.cookies.cart || [];
    let products = await Product.find({ _id: { $in: cart } });
  
        let order = new Order({
      user: req.session.user._id,
      products: products,
      totalAmount: products.reduce((sum, product) => sum + product.price, 0),
      status: "pending"
    });
  
    await order.save();
    res.clearCookie("cart"); // Clear the cart cookie after checkout
  
    return res.redirect("/order-success"); // Redirect to a success page
  });


app.get("/order-success", (req, res) => {
    res.render("admins_ejs_files/orderSuccess", {
        layout: "AdminParent",
        title: "Order Placed Successfully",
    });
});


// const webMiddleware = require("./middlewares/web.middleware");
// const adminMiddleware = require("./middlewares/admin.middleware");
// const authMiddleware = require("./middlewares/authentication.middle");
// app.use(webMiddleware);

// app.use("/" , authMiddleware, adminMiddleware, ProductsTable);

app.get("/",  (req, res) => {
    return res.render("bootstrap", {
      layout: "layout",
      title: "Landing Page",
    });
});

app.get("/contact" ,(req, res) => {
    return res.render("about-me");
});

 app.get("/logout", async (req, res) => {
     req.session.user = null;
     return res.redirect("/login");
 });


 app.get("/cart", async (req, res) => {
    let cart = req.cookies.cart || [];
    let products = await Product.find({ _id: { $in: cart } });
  
    return res.render("cart", { products });
  });

    


 //app.get("/login" , (req, res) => {
//
  //   res.render("admins_ejs_files/login" , {
    //     layout: 'AdminParent',
      //   title: "Login Page",
 //    });
 //});



 /*app.post("/login", async(req, res) => {
     let data = req.body;


     let user = await USER.findOne({email: data.username});
     if(!user)
     {
         console.log("user not available");
         return res.redirect("/registration");
     }

     let isValid;
     isValid = user.password == data.password;

     if(user &&  !isValid)
     {
         console.log("wrong password");
         return res.redirect("/login");
     }
     req.session.user = user;
     return res.redirect("/");

 });


 app.get("/registration", (req, res) => {
     res.render("admins_ejs_files/registration", {
         layout: "AdminParent",
         title: "Registration Page",
     });
 });


  app.post("/registration", async (req, res) => {
     let data = req.body;
     // let user = new USER(data);
     let user = await USER.findOne({email: data.email});
     if(user)
     {
         return res.redirect("/registration");
     }
     user = new USER(data);
     // user.email = data.email;

     await user.save();
     res.redirect("/login");
 });*/


 app.get("/add-to-cart/:id", (req, res) => {
     let cart = req.cookies.cart;
     cart = cart ? cart : [];
     cart.push(req.params.id);
     res.cookie("cart", cart);
     res.redirect("/admin");
 });







let connectionString = "mongodb://localhost/Outfitters";
mongoose.connect(connectionString, {useNewUrlParser: true, serverSelectionTimeoutMS: 5000,})
        .then( () => console.log("connected to the MongoDB : " + connectionString))
        .catch( (error) => console.log(error.message));



app.listen(4000, () => {
    console.log("Server started at port 4000");
});

