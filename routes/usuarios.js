const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    check('rol').custom( (rol) => esRolValido(rol) ),
    validarCampos
], usuariosPut);

router.post('/', [
    // esta info se almacena en el request
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //El not es para negarlo
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo ya existe').custom( emailExiste ),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    
    //Existes 2 opciones para enviar el params "rol"
    check('rol').custom( esRolValido ), //Opcion1: que cuando solo tiene 1 params se asume que se enviara "rol"
    //check('rol').custom( (rol) => esRolValido(rol) ), //Opcion2
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos
],
usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;