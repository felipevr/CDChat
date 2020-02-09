const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logConfig = require('./config/logConfig.js');

//variaves ambiente
require('dotenv').config({
    path: '.env'
});

//logger
app.use(logConfig.getLogger());

//body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//banco de dados
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
});

//ROTAS

//TRATAMENTO DE ERRO
app.use(logConfig.getErrorLogger());
app.use((err, req, res, next) => {
    return res.status(500).json({
        status: "error",
        message: err.message,
        data: err
    });
});

let port = process.env.port;
app.listen(port, () => console.log(`Aplicação rodando ... na porta :${port}.`));