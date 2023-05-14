var botoesDeRemovedor = document.getElementsByClassName("botaoRemovedor")
for (let i = 0; i < botoesDeRemovedor.length; i++){
    botoesDeRemovedor[i].addEventListener("click", removendoItem)
}

var quantProdutoNoCarrinho = document.getElementsByClassName("quantProduto")
for (let i = 0; i < quantProdutoNoCarrinho.length; i++){
    quantProdutoNoCarrinho[i].addEventListener("change", atualizandoTotal)
}

var adicionandoItem = document.getElementsByClassName("addCarrinho")
for (let i = 0; i < adicionandoItem.length; i++){
    adicionandoItem[i].addEventListener("click", addAoCarrinho)
}


function checkIfInputIsNull(event){
    if (event.target.value == "0"){
        event.target.parentElement.parentElement.remove()
    }

    atualizandoTotal()
}


function addAoCarrinho(event){
    var button = event.target
    var infoProdutos = button.parentElement
    var imagemDoProduto = infoProdutos.getElementsByClassName("fotoProduto")[0].src
    var nomeDoProduto = infoProdutos.getElementsByClassName("nomeJogo")[0].innerText
    var valorDoProduto = infoProdutos.getElementsByClassName("preco")[0].innerText
    var comparandoNomes = document.getElementsByClassName("tituloDoProduto")
    for (var i = 0; i < comparandoNomes.length; i++){
        if (comparandoNomes[i].innerText == nomeDoProduto){
            comparandoNomes[i].parentElement.parentElement.getElementsByClassName("quantProduto")[0].value++
            
            return
        }
    }
    
    alert(`${nomeDoProduto} Adicionado a sua lista de compras!`)
    
    let adicionandoProduto = document.createElement("tr")
    adicionandoProduto.classList.add("produtoCarrinho")

    adicionandoProduto.innerHTML = 
    `
        <td class="identificacaoProduto">
            <img src="${imagemDoProduto}" alt="" class="cardFotoDoProduto">
        </td>
        <td>
            <span class="tituloDoProduto">${nomeDoProduto}</span>
        </td>
        <td>
            <span class="cardPrecoDoProduto">${valorDoProduto}</span>
        </td>
        <td>
            <input class="quantProduto" type="number" value="1" min="0">
            <button class="botaoRemovedor" type="button">Remover</button>
        </td>
    `

    var tableBody = document.querySelector(".tabela-carrinho tbody")
    tableBody.append(adicionandoProduto)

    atualizandoTotal()
    adicionandoProduto.getElementsByClassName("quantProduto")[0].addEventListener("change", checkIfInputIsNull)
    adicionandoProduto.getElementsByClassName("botaoRemovedor")[0].addEventListener("click", removendoItem)
}


function removendoItem(event){
    event.target.parentElement.parentElement.remove()
    atualizandoTotal()
}


function atualizandoTotal(event){
    let totalDaCompra = 0
    var produtosDoCarrinho = document.getElementsByClassName("produtoCarrinho")
    for (let i = 0; i < produtosDoCarrinho.length; i++){
        var precoDoProdutoNoCarrinho = produtosDoCarrinho[i].getElementsByClassName("cardPrecoDoProduto")[0].innerText.replace("R$" , "").replace("," , ".")
        var quantProdutos = produtosDoCarrinho[i].getElementsByClassName("quantProduto")[0].value
        
        totalDaCompra += precoDoProdutoNoCarrinho*quantProdutos
    }
    totalDaCompra = totalDaCompra.toFixed(2)
    totalDaCompra = totalDaCompra.replace("." , ",")
    document.querySelector(".precoTotal").innerText = "R$ " + totalDaCompra
}