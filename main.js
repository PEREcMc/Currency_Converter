// получение данных json с помощью fetch через then

// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
//     return result.json()
// }).then(function (data) {
//     console.log(data);
// })  

// Создаём объект для курсов валют
const currencyRates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementUAH = document.querySelector('[data-value="UAH"]');

const input = document.getElementById('input');
const result = document.getElementById('result');
const select = document.getElementById('select');


// Записываем промис, полученный фетчем в константу, помещаем её в ассинхронную функцию и указываем, что фетчу нужно подождать пока он выполнится перед записью в респонс

async function getCurrenies() { // в ассинхронной функции можно потреблять промисы
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js'); // fetch возвращает promise
    const data = await response.json(); // распоковываем контент, получаем данные: объект в промисе
    const result = await data; // возвращаем js объект из промиса

    currencyRates.USD = result.Valute.USD;
    currencyRates.EUR = result.Valute.EUR;
    currencyRates.UAH = result.Valute.UAH;

    elementUSD.textContent = currencyRates.USD.Value.toFixed(2);
    elementEUR.textContent = currencyRates.EUR.Value.toFixed(2);
    elementUAH.textContent = currencyRates.UAH.Value.toFixed(2);

    console.log(result)

    colorsInfoRates()
}

const colorsInfoRates = () => {

    // Цвет для информера: подорожал - красный, иначе - зелёный
    switch (true) {
        case currencyRates.USD.Value > currencyRates.USD.Previous:
             elementUSD.classList.add('top')
             elementUSD.classList.remove('bottom')
            break;
        case currencyRates.USD.Value < currencyRates.USD.Previous:
             elementUSD.classList.add('bottom')
             elementUSD.classList.remove('top')
             break;    
        default:
            break;
        }
    
        // if(currencyRates.USD.Value > currencyRates.USD.Previous) {
        //     elementUSD.classList.add('top')
        //     elementUSD.classList.remove('bottom')
        // } else {
        //     elementUSD.classList.add('bottom')
        //     elementUSD.classList.remove('top')
        // }
    
        if(currencyRates.EUR.Value > currencyRates.EUR.Previous) {
            elementEUR.classList.add('top')
            elementEUR.classList.remove('bottom')
        } else {
            elementEUR.classList.add('bottom')
            elementEUR.classList.remove('top')
        }
    
        if(currencyRates.UAH.Value > currencyRates.UAH.Previous) {
            elementUAH.classList.add('top')
            elementUAH.classList.remove('bottom')
        } else {
            elementUAH.classList.add('bottom')
            elementUAH.classList.remove('top')
        }
}

getCurrenies();

setInterval(getCurrenies, 10000);


// Конвертация курса валют
input.oninput = convertRatesValue;
select.oninput = convertRatesValue;

function convertRatesValue() {
    result.value = (parseFloat(input.value) / currencyRates[select.value].Value).toFixed(2);
}



