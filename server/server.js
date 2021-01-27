require('./config/config')

const express    = require('express');
const mongoose   = require('mongoose');
const app        = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuracion global de rutas.
app.use( require('./routes/index') );

mongoose.connect( process.env.URLDB , {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            
            if (err) {
                throw err;
            }

            console.log('Base de Datos conectada');
 
        });

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ' + process.env.PORT);
});


// .then(console.log('Se ha conectado exitosamente.'))
// .catch(console.warn);