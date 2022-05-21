const Sucursal = require('../models/sucursales.model');
const Empresa = require('../models/empresas.model');


function RegistrarSucursal(req, res) {
    var parametros = req.body;
    var cat = new Sucursal();
    var logeado = req.user;

    if(parametros.nombre ) {
            cat.nombre = parametros.nombre;
            cat.direccion = parametros.direccion;
            cat.municipio =  parametros.municipio;

            Empresa.find ({id_usuario :logeado.sub}, (err,EmprEnc)=>{
                if(err) return res.status(500).send({mensaje:'no tiene una empresa Creada'})
                if(!EmprEnc) return res.status(500).send({mensaje:'no existe una empresa'})

                cat.id_empre = EmprEnc._id;

                Sucursal.find({ direccion : parametros.direccion }, (err, catEncontrado) => {
                    if ( catEncontrado.length == 0 ) {
    
                        cat.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar la empresa'});
                            
                            return res.status(200).send({ Sucursales: usuarioGuardado });
                        });                 
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Esta Sucursal ya existe en la base de datos ' });
                    }
                })

            })

            
    }
}


function EditarEmpresa(req, res) {
    var idCat = req.params.idCat;
    var parametros = req.body;
    
    Empresa.findByIdAndUpdate(idCat, parametros, { new : true } ,(err, catEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!catEditado) return res.status(404)
            .send({ mensaje: 'Error al editar los datos  de la  Categoria' });

        return res.status(200).send({ Empresa_Editada: catEditado});
    })

    
}


function EliminarSucursal(req, res) {
    var idCat= req.params.idStation;

   
    Sucursal.findByIdAndDelete(idCat, (err, catEliminada)=>{
        if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la categoria"});
        if(!catEliminada) return res.status(400).send({ mensaje: "Error al eliminar la Empresa"});

        return res.status(200).send({ Sucursal_Eliminada: catEliminada})
    })
   
}


function visualizarSucursal(req, res) {
    
    Sucursal.find({}, (err, catEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!catEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empresa' })

        return res.status(200).send({ Sucursales: catEncontrado })
    })
}


module.exports={
    RegistrarSucursal,
    EliminarSucursal,
    visualizarSucursal,
    EditarEmpresa
    }