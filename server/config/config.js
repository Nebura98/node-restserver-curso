/**
 * Puerto
*/
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno local
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Vencimiento del token
 * 60 segundo
 * 60 minutos
 * 24 horas 
 * 30 días
 */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 *30;


/**
 * Seed de autentificación
 */

process.env.SEED = process.env.SEED || 'Seed of development';

/**
 * Base de datos
 */

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

