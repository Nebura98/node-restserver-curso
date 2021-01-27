const jwt = require('jsonwebtoken');


/**
 * Verificar token
 */

const verificarToken = ( req, res, next ) => {

    let token = req.get('Authorization');

    jwt.verify( token, process.env.SEED , ( err, decoded ) => {

        if ( err ) {
            return res.status(401).json({
                ok: false,
                err: {
                    message:'Token no valído.'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};

/**
 * Verifica ADMIN_ROLE
 */

const verificarAdminRole = ( req, res, next ) => {
    let role = req.usuario.role;

    if ( role === 'ADMIN_ROLE' ) {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message:'El usuario no cuenta con los permisos.'
            }
        });
    }
}

module.exports = { 
    verificarToken, 
    verificarAdminRole
};