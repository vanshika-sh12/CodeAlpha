const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("ShopEase Backend is running!");
});

// Read products from products.json
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");

  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading products:", error);
      return res.status(500).json({
        message: "Unable to load products",
      });
    }

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseError) {
      console.error("Invalid products JSON:", parseError);
      res.status(500).json({
        message: "Invalid products data",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`ShopEase server running at http://localhost:${PORT}`);
});