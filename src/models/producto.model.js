const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    nombreProduct:String,
    Proveedor:String,
    cantidad:Number,
    vendidos:Number,
    id_empre: { type: Schema.Types.ObjectId, ref: 'Empresa'},
});

module.exports = mongoose.model('Productos',ProductoSchema);