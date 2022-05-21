const Product = require('../models/producto.model');
const Empres = require('../models/empresas.model');


function RegistrarProduct(req, res) {
    var parametros = req.body;
    var cat = new Product();
    var logeado = req.user;

    if(parametros.nombre ) {
            cat.nombreProduct = parametros.nombre;
            cat.Proveedor = parametros.proveedor;
            cat.cantidad = parametros.cantidad;

            Empres.findOne({id_usuario :logeado.sub}, (err,EmprEnc)=>{
                if(err) return res.status(500).send({mensaje:'no tiene una empresa Creada'})
                if(!EmprEnc) return res.status(500).send({mensaje:'no existe una empresa'})

                cat.id_empre = EmprEnc._id;

                Product.find({ nombreProduct:parametros.nombre }, (err, catEncontrado) => {
                    if ( catEncontrado.length == 0 ) {
    
                        cat.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar la empresa'});
                            
                            return res.status(200).send({ Producto: usuarioGuardado });
                        });                 
                    } else {
                        Product.findOneAndUpdate({Product: {$elemMatch:{nombreProduct:parametros.nombre}}}, {$inc:{"cantidad": parametros.cantidad}}, { new: true }, (err, ProdEdit) =>{
                            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                            if(!ProdEdit) return res.status(500).send({ mensaje: 'Error al agregar la empresa'});
                        
                        return res.status(200).send({ Producto: ProdEdit });
                        } )
                        
                    }
                })

            }) 
           
    }
}


function EditarProd(req, res) {
    var idCat = req.params.idCat;
    var parametros = req.body;
    var logeado = req.user;
    
    Empres.findOne({id_usuario:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})

        Product.findOneAndUpdate({_id:idCat, id_empre : Empr._id}, parametros,{ new : true } ,(err, catEditado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!catEditado) return res.status(404)
                .send({ mensaje: 'Verifica que sea tu producto' });
    
            return res.status(200).send({ Producto_Editado: catEditado});
        })

    })
       
    
}


function EliminarProd(req, res) {
    var idCat= req.params.idCat;
    var logeado = req.user;

    Empres.findOne({id_usuario:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})
        
        Product.findOneAndDelte({_id:idCat, id_empre:Empr._id}, (err, catEliminada)=>{
            if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar producto"});
            if(!catEliminada) return res.status(400).send({ mensaje: "Error al eliminar el producto"});
    
            return res.status(200).send({ Producto_Eliminado: catEliminada})
        })   
    
    })
    
   
}


function visualizarProds(req, res) {
    
    Product.find({}, (err, catEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!catEncontrado) return res.status(500).send({ mensaje: 'Error al buscar productos' })

        return res.status(200).send({ Productos: catEncontrado })
    })
}

module.exports={
    RegistrarProduct,
    visualizarProds,
    EditarProd,
    EliminarProd
    }