const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalesSchema = Schema({
    nombre:String,
    direccion:String,
    municipio:String,
    id_empre: { type: Schema.Types.ObjectId, ref: 'Empresa'},
});

module.exports = mongoose.model('Sucursales',SucursalesSchema);