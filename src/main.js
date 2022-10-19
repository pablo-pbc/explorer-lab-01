import "./css/index.css"
import IMask from 'imask'

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path") //Seletor da primeira cor para o efeito degrade
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path") //Seletor da segunda cor para o efeito degrade
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img') //Seletor para o logo da bandeira do cartão

//Esquema de cores de acordo com a bandeira do cartão
function setCardType(cardFlag) {
    //Constante do tipo {CHAVE e VALOR} -> CHAVE = txt e VALOR = array de cores
    const colors = {
        visa: ['#436D99', '#2D57F2'],
        mastercard: ['#DF6F29', '#C69347'],
        american: ['#51CEB0', '#0081DE'],
        default: ['black', 'gray']
    }

    //Atribuindo ao elemento a cor do gradiente e a bandeira do cartão de acordo com a escolha do usuario
    ccBgColor01.setAttribute("fill", colors[cardFlag][0])
    ccBgColor02.setAttribute("fill", colors[cardFlag][1])
    ccLogo.setAttribute('src', `cc-${cardFlag}.svg`)
}

//Setting setCardType function as a global function
globalThis.setCardType = setCardType

//Selecting card security code and making your mask
const securityCode = document.querySelector('#security-code')//Selecionando o elemento
const securityCodePattern = {mask: '0000'}//Criando a mascara
const securityCodeMasked = IMask(securityCode, securityCodePattern)//Utilizando o Imask para validar o campo