const express = require('express');
const bcrypt  = require('bcrypt');
const _       = require('underscore');
const app     = express();
const Usuario = require('../models/Usuario');

app.get('/usuario', function (req, res) {
    
    let since = Number(req.query.since || 0);
    let limit = Number(req.query.limit || 5);

    Usuario.find({ "status": true }, 'name, email google role status  img')
        .skip(since)
        .limit(limit)
        .exec()
        .then( 
            async ( data ) => { 
                    let count = await Usuario.countDocuments( { "status":true } );
                    res.json({
                        ok: true,
                        'Cantidad de usuarios': count,
                        data
                    });
            })
            .catch( 
                err => {
                res.status(400).json({
                    ok:false,
                    err
                });
            })

});
  
app.post('/usuario', function (req, res) {
    let body = req.body;
    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        role: body.role
    });

    usuario.save( ( err, usuarioDB ) => {
        if( err ){
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        });
    });
});
  
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body,['name','email','img', 'role', 'status']);

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, ( err, usuarioDB ) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;
    const changeStatus = { "status": false };

    Usuario.findByIdAndUpdate( id, changeStatus, { new: true, runValidators: true }, ( err, userDeleted ) => {
        
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        if( !userDeleted ){
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe.'
            });
        }

        res.json({
            ok: true,
            usuario: userDeleted
        })
    });



});


module.exports = app;