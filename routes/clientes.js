const express = require("express");
const router = express.Router();
const db = require("../db")


// retorna todos os clientes
router.get("/",async (req,res,next)=>{

    const {rows} = await db.pool.query(`
    SELECT 
    cliente_id,
    cliente_nome,
    cliente_telefone,
    cliente_email,
    to_char(cliente_datacadastrado, 'DD/MM/YYYY')  AS cliente_datacadastrado  
    FROM clientes`
    
    )
 
    res.status(200).send({
        data : rows
    })  
})

// cadastra um cliente
router.post("/", async (req,res,next)=>{

    const cliente = req.body

    console.log(cliente)
    const {rows} = await db.pool.query(`
    INSERT INTO clientes (cliente_nome,cliente_email,cliente_telefone,cliente_datacadastrado) 
    VALUES ('${cliente.cliente_nome}','${cliente.cliente_email}','${cliente.cliente_telefone}','${cliente.cliente_datacadastrado}')`
    )

    res.status(200).send({
        data : rows
    })
})

router.put("/:id", async (req,res,next)=>{

    const cliente = req.body
    const id = req.params.id

    console.log(cliente)
    await db.pool.query(`
    UPDATE clientes SET 
    cliente_nome = '${cliente.cliente_nome}',
    cliente_email = '${cliente.cliente_email}',
    cliente_telefone = '${cliente.cliente_telefone}',
    cliente_datacadastrado = '${cliente.cliente_datacadastrado}'
    WHERE cliente_id = '${id}'`
    )

    res.status(200).send({
        data : "SUCESSO"
    })
})

router.delete("/:id",async (req,res,next)=>{

    const id = req.params.id
    console.log(id)
    await db.pool.query(`
        DELETE FROM clientes WHERE cliente_id = ${id}`)
 
    res.status(200).send({
         data : "SUCESSO"
    })  
})



router.get("/clientesMes/:ano",async (req,res,next)=>{

    const ano = req.params.ano

    const {rows} = await db.pool.query(`
    SELECT	
    CASE 			
         WHEN DATE_PART('month',cliente_datacadastrado) = 1 THEN 'Janeiro' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 2 THEN 'Fevereiro' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 3 THEN 'Março' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 4 THEN 'Abril' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 5 THEN 'Maio' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 6 THEN 'Junho' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 7 THEN 'Julho' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 8 THEN 'Agosto' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 9 THEN 'Setembro' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 10 THEN 'Outubro' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 11 THEN 'Novembro' 
         WHEN DATE_PART('month',cliente_datacadastrado) = 12 THEN 'Dezembro' 
         END AS  mes,
            COUNT(cliente_id) AS total,
         DATE_PART('month',cliente_datacadastrado) AS mes_numero
    FROM clientes
    WHERE DATE_PART('year',cliente_datacadastrado) = ${ano}
    GROUP BY DATE_PART('month',cliente_datacadastrado)
    ORDER BY mes_numero`
    
    )
 
    res.status(200).send({
        data : rows
    })  
})


module.exports = router