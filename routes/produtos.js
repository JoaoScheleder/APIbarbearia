const express = require("express");
const router = express.Router();
const db = require("../db")


// retorna todos os clientes
router.get("/",async (req,res,next)=>{

    const {rows} = await db.pool.query(`
    SELECT 
    produto_id
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

    console.log(cliente)
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

    console.log(cliente)
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
    CASE 			
         WHEN DATE_PART('month',produto_datacadastrado) = 1 THEN 'Janeiro' 
         WHEN DATE_PART('month',produto_datacadastrado) = 2 THEN 'Fevereiro' 
         WHEN DATE_PART('month',produto_datacadastrado) = 3 THEN 'Março' 
         WHEN DATE_PART('month',produto_datacadastrado) = 4 THEN 'Abril' 
         WHEN DATE_PART('month',produto_datacadastrado) = 5 THEN 'Maio' 
         WHEN DATE_PART('month',produto_datacadastrado) = 6 THEN 'Junho' 
         WHEN DATE_PART('month',produto_datacadastrado) = 7 THEN 'Julho' 
         WHEN DATE_PART('month',produto_datacadastrado) = 8 THEN 'Agosto' 
         WHEN DATE_PART('month',produto_datacadastrado) = 9 THEN 'Setembro' 
         WHEN DATE_PART('month',produto_datacadastrado) = 10 THEN 'Outubro' 
         WHEN DATE_PART('month',produto_datacadastrado) = 11 THEN 'Novembro' 
         WHEN DATE_PART('month',produto_datacadastrado) = 12 THEN 'Dezembro' 
         END AS  mes,
            COUNT(produto_id) AS total,
         DATE_PART('month',produto_datacadastrado) AS mes_numero
    FROM produtos
    WHERE DATE_PART('year',produto_datacadastrado) = ${ano}
    GROUP BY DATE_PART('month',produto_datacadastrado)
    ORDER BY mes_numero`
    )
 
    res.status(200).send({
        data : rows
    })  
})


module.exports = router