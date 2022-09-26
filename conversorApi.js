const monedaOne = document.getElementById('monedaUno');
const monedaTwo = document.getElementById('monedaDos');
const cantidadOne = document.getElementById('cantidadUno');
const cantidadTwo = document.getElementById('cantidadDos');
const cambio1 = document.getElementById('cambio');
const taza1 = document.getElementById('taza');


// Fetch al conversor
function calculate(){
    const moneda_one = monedaOne.value;
    const moneda_two = monedaTwo.value;

fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
.then(res => res.json() )
.then(data => {
 const taza = data.rates[moneda_two];

    cambio1.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

    cantidadTwo.value = (cantidadOne.value * taza).toFixed(2);

    } );
    
}

monedaOne.addEventListener('change', calculate);
cantidadOne.addEventListener('input', calculate);
monedaTwo.addEventListener('change', calculate);
cantidadTwo.addEventListener('input', calculate);

taza.addEventListener('click', () =>{
    const temp = monedaOne.value;
    monedaOne.value = monedaTwo.value;
    monedaTwo.value = temp;
    calculate();
} );


calculate();