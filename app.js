'use strict'

const express = require("express")
const app = express();
const project_routes = require("./routes/project");

// Middlewares - Es un método que se ejecuta antes de un controlador.
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
app.use("/api", project_routes);


// Exportar el módulo
module.exports = app;