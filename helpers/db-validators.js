const Usuario = require('../models/usuario');
const Rol = require('../models/rol');

const esRolValido =  async(rol='') => {
    const existeRol = await Rol.findOne({rol});
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}
 
const emailExiste = async(correo='') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioById = async( id ) => {
    //Verificar si el ID existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioById
}