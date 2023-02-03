//PATH: origin/
const main = require("express").Router();
const {BComp} = require('../utils');

//Routes
main.get('/', (req, res) => {
  res.status(200).render('index');
});

main.post('/process', (req,res) => {
  res.json({output: BComp(req.body.input)});
});

module.exports = main;
