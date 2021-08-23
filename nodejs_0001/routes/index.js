const { json } = require('express');
const express = require('express');
const controller = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
controller.get("/", function (req, res, next) {
  res.send("no!!!")
})

module.exports = controller;
