const express = require("express");
const router = express.Router();
const db = require("../db")


// retorna todos os clientes
router.get("/",async (req,res,next)=>{

    const {rows} = await db.pool.query(`
    SELECT 
    produto_id,
    produto_nome,
    produto_preco_custo,
    produto_preco_venda,
    produto_quantidade,
    to_char(produto_datacadastrado, 'DD/MM/YYYY')  AS produto_datacadastrado  
    FROM produtos`
    
    )
 
    res.status(200).send({
        data : rows
    })  
})

// cadastra um cliente
router.post("/", async (req,res,next)=>{

    const produto = req.body

    const {rows} = await db.pool.query(`
    INSERT INTO produtos
     (produto_nome,produto_preco_custo,produto_preco_venda,produto_quantidade,produto_datacadastrado) 
    VALUES (
        '${produto.produto_nome}',
        '${produto.produto_preco_custo}',
        '${produto.produto_preco_venda}',
        '${produto.produto_quantidade}',
        '${produto.produto_datacadastrado}'
        )`
    )

    res.status(200).send({
        data : rows
    })
})

router.put("/:id", async (req,res,next)=>{

    const produto = req.body
    const id = req.params.id

    await db.pool.query(`
    UPDATE produtos SET 
    produto_nome = '${produto.produto_nome}',
    produto_preco_custo = '${produto.produto_preco_custo}',
    produto_preco_venda = '${produto.produto_preco_venda}',
    produto_quantidade = '${produto.produto_quantidade}',
    produto_datacadastrado = '${produto.produto_datacadastrado}'
    WHERE produto_id = '${id}'`
    )

    res.status(200).send({
        data : "SUCESSO"
    })
})

router.delete("/:id",async (req,res,next)=>{

    const id = req.params.id
    console.log(id)
    await db.pool.query(`
        DELETE FROM produtos WHERE produto_id = ${id}`)
 
    res.status(200).send({
         data : "SUCESSO"
    })  
})



router.get("/produtosMes/:ano",async (req,res,next)=>{

    const ano = req.params.ano

    const {rows} = await db.pool.query(`
    SELECT 
        produto_nome,
        produto_quantidade 
    FROM produtos 
    WHERE DATE_PART('year',produto_datacadastrado) = ${ano}
    ORDER BY produto_quantidade DESC;`
    )
 
    res.status(200).send({
        data : rows
    })  
})


router.get("/painelEstoque",async (req,res,next)=>{

    const ano = req.params.ano

    const {rows} = await db.pool.query(`
        SELECT 
            SUM(produto_preco_custo*produto_quantidade) AS CUSTO_TOTAL,
            SUM(produto_preco_venda*produto_quantidade) AS LUCRO_BRUTO,
            SUM(produto_preco_venda*produto_quantidade) - SUM(produto_preco_custo*produto_quantidade) AS LUCRO_LIQUIDO
        FROM produtos;`
    )
 
    res.status(200).send({
        data : rows
    })  
})


module.exports = router