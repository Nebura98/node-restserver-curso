require('./config/config')

const express    = require('express');
const mongoose   = require('mongoose');
const app        = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use( require('./routes/usuario') )



/**
 * Conectar al base de datos de mongo.
 */
// mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
//     if (err) throw err;

//     console.log('La base de datos ha sido conectado exitosamente.');
// });


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
    console.log('Escuchando el puerto 3000');
});


// .then(console.log('Se ha conectado exitosamente.'))
// .catch(console.warn);