const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const contatoController = require('./src/controllers/contatoController')

//Rotas da home
route.get('/', homeController.GETPaginaInicial);
route.post('/', homeController.POSTPaginaInicial);


//Rotdas de contato
route.get('/contato', contatoController.GETPaginaContato)

module.exports = route;