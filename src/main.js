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

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {        
        MM: {
            mask: IMask.MaskedRange, //Método dentro do Imask para aplicar um range à mascara
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2), //Aqui eu recupero o ano atual e corto os dois primeiro digitos do ano, assim tenho o 22 de 2022.
            to: String(new Date().getFullYear() + 10).slice(2)
        },
    },
 }
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
    mask: [
        {
            mask: '0000 0000 0000 0000',
            regex: /^4\d{0,15}/, //expressão regular (Regex) para o cartão visa
            flagCard: 'visa',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: /(^5[1-5]\d{0.2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/, //expressão regular (Regex) para o cartão mastercard
            flagCard: 'mastercard',
        },
        {
            mask: '0000 0000 0000 0000',
            flagCard: 'default',
        },
    ],

    //função de varredura das mascaras
    dispatch: function (appended, dynamicMasked) {
        //percorrendo as mascaras enquanto o usuario digita e caso uma letra seja digita, a letra é trocada por vazio
        const number = (dynamicMasked.value + appended).replace(/\D/g,'');
        //Se o usuario digitou certo e o numero deu "match" com o mascara a constante foundMask retorna true.
        const foundMask = dynamicMasked.compiledMasks.find(({regex}) => number.match(regex));

        console.log(foundMask)
        return foundMask
    },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)