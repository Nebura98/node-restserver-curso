const express = require('express');
const bcrypt  = require('bcrypt');
const app     = express();
const Usuario = require('../models/usuario');
const jwt     = require('jsonwebtoken');

app.post('/login', (req, res) => {


    let body = req.body;

    Usuario.findOne({ email: body.email }, ( err, usuarioDB ) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Borrar los parentesis, para el desarrollo.
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                message:'(Usuario) o contraseña incorrectos.'
            });
        }

        if ( !bcrypt.compareSync(body.password, usuarioDB.password) ){
            return res.status(400).json({
                ok: false,
                message:'Usuario o (contraseña) incorrectos.'
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
})

module.exports = app;