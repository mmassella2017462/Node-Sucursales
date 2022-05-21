const express = require('express');
const controlProd = require('../controllers/productos.controller');
const md_autenticacion = require('../middlewares/autentication');
const md_autRol = require('../middlewares/validaciones');

const api = express.Router();


api.post('/registrarProducto', [md_autenticacion.Auth, md_autRol.verCliente],controlProd.RegistrarProduct);
api.get('/verProductos', md_autenticacion.Auth,controlProd.visualizarProds);
api.put('/editarProducto/:idCat', [md_autenticacion.Auth, md_autRol.verCliente],controlProd.EditarProd)
api.delete('/eliminarProducto/:idProd', [md_autenticacion.Auth, md_autRol.verCliente],controlProd.EliminarProd);


module.exports = api;