
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//Simulacro de compra vacia el carrito y agradece al usuario
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    sessionStorage.clear()
    localStorage.clear()
    actualizarCarrito()
    swal({
        title: "¡Gracias por su compra!",
        icon: "success",
        button: "Continuar",
    });
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

const boton = document.getElementById(`agregar${producto.id}`)

boton.addEventListener('click', () => {
    swal({
        title: "Producto agregado al carrito",
        icon: "success",
        button: "¡Continuar comprando!",
      });
     agregarAlCarrito(producto.id)
 })
})

const agregarAlCarrito = (prodId) => {

const existe = carrito.some (prod => prod.id === prodId) //para no agregar dos veces el mismo elemento

 if (existe){ 
     const prod = carrito.map (prod => { 
         if (prod.id === prodId){
             prod.cantidad++
         }
     })
 } else { 
     const item = stockProductos.find((prod) => prod.id === prodId)
     carrito.push(item)
 }
 
 actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
 const item = carrito.find((prod) => prod.id === prodId)

 const indice = carrito.indexOf(item)

 carrito.splice(indice, 1)
 actualizarCarrito()
 console.log(carrito)
}

const actualizarCarrito = () => {
 contenedorCarrito.innerHTML = ""
 carrito.forEach((prod) => {
     const div = document.createElement('div')
     div.className = ('productoEnCarrito')
     div.innerHTML = `
     <p>${prod.nombre}</p>
     <p>Precio:$${prod.precio}</p>
     <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
     <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
     `

     contenedorCarrito.appendChild(div)
     
     localStorage.setItem('carrito', JSON.stringify(carrito))

 })

 contadorCarrito.innerText = carrito.length 
 console.log(carrito)
 precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}