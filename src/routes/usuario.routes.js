const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');

const md_aut = require('../middlewares/autentication');

const api = express.Router();


api.post('/registrar', controladorUsuario.RegistrarUsuario);
api.post('/login', controladorUsuario.Login);
api.get('/verPerfil',md_aut.Auth , controladorUsuario.VerPerfil);
api.put('/editarPerfil', md_aut.Auth, controladorUsuario.EditarPerfil);




module.exports = api;
