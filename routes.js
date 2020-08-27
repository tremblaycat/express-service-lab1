"use strict";

//req the express mod
const express = require("express");
//create new router object
const routes = express.Router();

//can it hear the routes
console.log(`This is the ROUTES.JS`);

//cart items
const cartItems = [
  { id: 1, product: "Earl Grey Scones", price: 2.5, quantity: 5 },
  { id: 2, product: "Honey Fig Buns", price: 1.5, quantity: 3 },
  { id: 3, product: "Raspberry Fudge", price: 3, quantity: 9 },
  { id: 4, product: "Rosemary Lemon Biscuits", price: 2, quantity: 2 },
  { id: 5, product: "Pain au Chocolat", price: 3, quantity: 5 },
];
let nextId = 6;

//GET method /cartItems responds with an array of items
routes.get("/cartItems", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  const prefix = req.query.prefix;
  //   const pageSize = req.query.pageSize;
  if (maxPrice) {
    const filteredPrice = cartItems.filter(
      (cartItems) => cartItems.price < maxPrice
    );
    res.json(filteredPrice);
  } else if (prefix) {
    const findPrefix = cartItems.filter(
      (cartItems) => cartItems.product === prefix
    );
  }
  res.json(cartItems);
  res.status(200);
});

//GET to receive single object
routes.get("/cartItems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.send(`No movie with id ${id} exists.`);
  }
});

//create POST
routes.post("/cartItems", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  cartItems.push(item);
  res.status(201);
  res.json(item);
});

//update object with PUT

routes.put("/cartItems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  const index = cartItems.findIndex((item) => item.id === id);
  if (index >= 1) {
    cartItems.splice(index, 1);
    cartItems.push(item);
  }
  res.json(item);
  res.status(200);
});

//delete object
//Delete movie
routes.delete("/cartItems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.status(204);
  res.send();
});

module.exports = { routes };
