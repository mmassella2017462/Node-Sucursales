const Empresa = require('../models/empresas.model');
const Product = require('../models/producto.model');
const Sucursal = require('../models/sucursales.model');


function RegistrarEmpresa(req, res) {
    var parametros = req.body;
    var user= req.user;
    var cat = new Empresa();

    if(parametros.nombre ) {
            cat.nombre = parametros.nombre;
            cat.descripcion = parametros.descripcion;
            cat.tipoEmpresa = parametros.tipo;
            cat.id_usuario = user.sub;
            Empresa.find({ nombre : parametros.nombre }, (err, catEncontrado) => {
                if ( catEncontrado.length == 0 ) {

                    cat.save((err, usuarioGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if(!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al agregar la empresa'});
                        
                        return res.status(200).send({ Empresas: usuarioGuardado });
                    });                 
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Esta empresa ya existe en la base de datos ' });
                }
            })
    }
}


//OBTENER UN PRODUCTO EN ESPECIFICO
function ObtenerEmpresaId (req, res) {
    const idEmpresa = req.params.idEmpresa;
    Empresa.findById(idEmpresa, (err, empresaEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!empresaEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la Empresa'});

        return res.status(200).send({ empresa: empresaEncontrado })
    })
    
}


function EditarEmpresa(req, res) {
    var EmpresaID = req.params.idEmpresa;
    var parametros = req.body;
    var logeado = req.user;

    Empresa.find({id_usuario:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})

        Empresa.findByIdAndUpdate(EmpresaID, parametros, { new : true } ,(err, empresaEditada)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!empresaEditada) return res.status(404)
                .send({ mensaje: 'Error al Editar la Empresa' });
    
            return res.status(200).send({ empresa: empresaEditada});
        })

    })
    
}


function EliminarEmpresa(req, res) {
    var idCat= req.params.idCat;
    var logeado = req.user;

    Empresa.find({id_usuario:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})


        Product.deleteMany( { "id_empre" : "idCat"} );
        Sucursal.deleteMany({id_empre: idCat});


        Empresa.findOneAndDelete({_id:idCat, id_usuario:logeado.sub}, (err, catEliminada)=>{
            if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la categoria"});
            if(!catEliminada) return res.status(400).send({ mensaje: "Error al eliminar la Empresa"});
    
            return res.status(200).send({ Empresa_Eliminada: catEliminada})
        })
    
    })
    
   
}


function visualizarEmpresas(req, res) {
    
    Empresa.find({}, (err, catEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!catEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empresa' })

        return res.status(200).send({ Empresas: catEncontrado })
    })
}


module.exports={
    RegistrarEmpresa,
    visualizarEmpresas,
    EliminarEmpresa,
    EditarEmpresa,
    ObtenerEmpresaId
    }