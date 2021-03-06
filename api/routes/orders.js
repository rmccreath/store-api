const express = require("express");
const router = express.Router();

// HTTP GET
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders were fetched",
  });
});

// HTTP POST
router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: "Order was created",
    order: order,
  });
});

// HTTP GET - specific order
router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order details",
    orderId: req.params.orderId,
  });
});

// HTTP DELETE
router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted",
  });
});

module.exports = router;
