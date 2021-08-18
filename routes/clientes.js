const express = require("express");
const router = express.Router();
const db = require("../db")


// retorna todos os clientes
router.get("/",async (req,res,next)=>{

    const {rows} = await db.pool.query(`
    SELECT 
    id_cliente,
    cliente_nome,
    cliente_telefone,
    to_char(cliente_datacadastrado, 'DD/MM/YYYY')  AS cliente_datacadastrado,
    vinho
    FROM clientes`)
 
    res.status(200).send({
        data : rows
    })  
})
// cadastra um cliente
router.post("/", async (req,res,next)=>{

    const cliente = req.body

    console.log(cliente)
    const {rows} = await db.pool.query(`
    INSERT INTO clientes 
    VALUES ('${cliente.cliente_nome}','${cliente.cliente_telefone}','${cliente.cliente_datacadastrado}','${cliente.vinho}')
    `)
})


module.exports = router