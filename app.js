
// importa e instancia o express
const express = require("express")
const bodyParser = require('body-parser');

const app = express();
const cors = require("cors");

app.use(bodyParser.json())
app.use(cors({
    origin : "http://localhost:4200"
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const rotaClientes = require('./routes/clientes');
const rotaProdutos = require('./routes/produtos');



app.use('/clientes', rotaClientes);
app.use('/produtos', rotaProdutos);


//teste pra ver se esta tudo funcionando
app.use("/teste",(req,res,next)=>{

    res.status(200).send({
        mensagem : "Tudo funcionando"
    }
    )

})

// exporta o app para o server utilizar na porta
module.exports = app