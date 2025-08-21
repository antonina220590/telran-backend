const express = require("express");
const path = require("path");
const categories = require("./routes/categories");
const sale = require("./routes/sale");
const order = require("./routes/order");
const products = require("./routes/products");
const sequelize = require("./database/database");
const cors = require("cors");
const Category = require("./database/models/category");
const Product = require("./database/models/product");

const PORT = process.env.PORT || 3333;

Category.hasMany(Product);

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/categories", categories);
app.use("/products", products);
app.use("/sale", sale);
app.use("/order", order);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`\n\nServer started on ${PORT} port...`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
