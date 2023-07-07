'use strict'

const mongoose= require("mongoose");
const app = require('./app');
const port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/portafolio')
.then( () => {
    console.log('Conexíon exitosa');

    // Creación del servidor
    app.listen(port, () => {
        console.log('Servidor corriendo en el puerto ' + port);
    });
})
.catch(err => console.log(err));