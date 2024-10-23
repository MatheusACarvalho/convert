// Cotação de moedas do dia
const USD = 5.69
const EUR = 6.15
const GBP = 7.36

//obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amout para receber apenas números
amount.addEventListener("input", () => {

    const has_caracters_regex = /\D+/g
    amount.value = amount.value.replace(has_caracters_regex, "")
})

//capturando o evendo de submit do formulário
form.onsubmit = () => {
    event.preventDefault()

    switch (currency.value){
        case "USD":
            convert_currency(amount.value, USD, "US$" )
            break
        case "EUR":
            convert_currency(amount.value, EUR, "€" )
            break
        case "GBP":
            convert_currency(amount.value, GBP, "£")
            break
    }
}


// Função para converter a moeda
function convert_currency(amount, price, symbol){
   try {
    // exibindo a cotação da moeda selecionada na descrição no footer
    description.textContent = `${symbol} 1 = ${format_currency_brl(price)}`

    // Calcula o total
    let total = amount * price

    // Verifica se o resultado não é um número
    if (isNaN(total)) {
        return alert("Por favor, digite o valor corretamente para converter")
    }

    // Formata o valor total 
    total = format_currency_brl(total).replace("R$", "")

    // Exibe o resultado total
    result.textContent = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result")
   } catch (error) {
    // Remove a classe do footer ocultando ele da tela.
    footer.classList.remove("show-result")

    console.log(error)
    alert("Não foi possível converter.")
   }
}

// Formata a moeda em Real Brasileiro
function format_currency_brl(value){

    //Primeiro formata o value para number, depois utiliza o toLocaleString para formatar no padrão BRL 
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}