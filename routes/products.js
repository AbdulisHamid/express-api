var express = require("express");
var router = express.Router();
const db = require("../models");

/* GET users listing. */

// http://localhost:3000/products/ GET Return all record
// http://localhost:3000/products/1 GET Return records by id
router.get("/:id?", async (req, res, next) => {
  const { id } = req.params;
  const where = {};
  if (id) {
    where.id = id;
  }
  const products = await db.Product.findAll({
    where,
  });
  res.status(200).send(products);
});

// http://localhost:3000/products/ POST
router.post("/", async function (req, res, next) {
  const payload = req.body;
  const product = await db.Product.create(payload);
  res.status(200).send(product);
});

// http://localhost:3000/products/1 PATCH
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  console.log(payload);
  const product = await db.Product.update(payload, {
    where: { id },
  });
  res.status(200).send(product);
});

// http://localhost:3000/products/1 DELETE
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await db.Product.destroy({ where: { id } });
  res.sendStatus(200);
});

module.exports = router;
