const formulario = document.querySelector("#formulario")
const nome = document.querySelector("#nome")
const preco = document.querySelector("#preco")
const quantidade = document.querySelector("#quantidade")
const resultados = document.querySelector("#resultados")

const lista_de_contato = JSON.parse(localStorage.getItem("macorronada")) || []

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const novo_contato = {
        nome: nome.value,
        preco: preco.value,
        quantidade: quantidade.value
    }

    lista_de_contato.push(novo_contato)
    localStorage.setItem("macorronada", JSON.stringify(lista_de_contato))
    montarCard(novo_contato)
    formulario.reset()
    nome.focus()
})

function montarCard(objeto) {
    const card = document.createElement("div")
    card.className = "caixinha"

    const nome_h2 = document.createElement("h2")
    nome_h2.textContent = `Nome: ${objeto.nome}`
    const preco_p = document.createElement("p")
    preco_p.textContent = `Preço: ${objeto.preco}`
    const quantidade_p = document.createElement("p")
    quantidade_p.textContent = `Quantidade: ${objeto.quantidade}`

    const botao_excluir = document.createElement("button")
    botao_excluir.textContent = "Excluir"
    botao_excluir.addEventListener("click", () => {
        resultados.removeChild(card)

        lista_de_contato.forEach((element, index) => {
            if (element.nome === objeto.nome) {
                lista_de_contato.splice(index, 1)
                localStorage.setItem("macorronada", JSON.stringify(lista_de_contato))
            }
        })
    })

    const botao_editar = document.createElement("button")
    botao_editar.textContent = "Editar"
    botao_editar.addEventListener("click", () => {
        const novo_nome = prompt("Digite o novo nome", objeto.nome)
        const novo_preco = prompt("Digite o novo preço", objeto.preco)
        const novo_quantidade = prompt("Digite a nova quantidade", objeto.quantidade)

        lista_de_contato.forEach((element) => {
            if (element.nome === objeto.nome) {
                element.nome = novo_nome
                element.preco = novo_preco
                element.quantidade = novo_quantidade
            }
        })

        localStorage.setItem("macorronada", JSON.stringify(lista_de_contato))

        nome_h2.textContent = `Nome: ${novo_nome}`
        preco_p.textContent = `Preço: ${novo_preco}`
        quantidade_p.textContent = `Quantidade: ${novo_quantidade}`
    })

    card.append(nome_h2, preco_p, quantidade_p, botao_editar, botao_excluir)
    resultados.append(card)
}

function montarTela() {
    lista_de_contato.forEach((element) => {
        montarCard(element)
    })
}

montarTela()


