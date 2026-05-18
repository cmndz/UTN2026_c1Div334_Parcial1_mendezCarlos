/* Funcion que obtiene el carrito del LocalStorage, lo parsea a un array
 y lo retorna */
function obtenerCarrito() {
    let arrayCarrito = localStorage.getItem('carritoEnLocalStorage');
    if (arrayCarrito) {
        return JSON.parse(arrayCarrito);
    } else {
        return []; //Si no lo encuentra, no existe, entonces devuelve un array vacio
    }
}

/* Funcion que guarda el carrito recibido al LocalStorage
, previamente transformado a string */
function guardarCarrito(carrito) {
    localStorage.setItem('carritoEnLocalStorage', carrito);
}

function sumarAlCarrito(e) {
    // Obtengo la referencia al elemento clickeado desde en base al evento 
    // (Propiedad exclusivamente de todos los Events) 
    let elementoClickeado = e.target;

    // Recupero los datos del Producto
    let producto = elementoClickeado.parentElement;
    const productoNombre = producto.querySelector('.nombre-producto').textContent;
    const productoPrecio = producto.querySelector('.precio-producto').textContent;

    // Recupero el Carrito
    let arrayCarrito = obtenerCarrito();

    // Reviso si Producto ya existe
    const existeEnElCarrito = arrayCarrito.some(producto => producto.nombre == productoNombre);

    if (existeEnElCarrito) {
        // Si existe, lo busco y aumento su cantidad
        let productoEnArray = arrayCarrito.find(producto => producto.nombre == productoNombre);
        productoEnArray.cantidad++;
    } else {
        // Si no existe, creo el producto y lo guardo
        const producto = { nombre: productoNombre, precio: productoPrecio, cantidad: 1 }
        arrayCarrito.push(producto);
    }

    //Debug Carrito
    console.log(arrayCarrito);

    // Guardo el Carrito
    const arrayCarritoStringify = JSON.stringify(arrayCarrito)
    guardarCarrito(arrayCarritoStringify);

    // Notifico que se agrego
    alert(`Un/una ${productoNombre} fue agregado al carrito`);
}

function restarDelCarrito(e) {
    // Obtengo la referencia al elemento clickeado desde en base al evento 
    // (Propiedad exclusivamente de todos los Events) 
    let elementoClickeado = e.target;

    // Recupero los datos del Producto
    let producto = elementoClickeado.parentElement;
    const productoNombre = producto.querySelector('.nombre-producto').textContent;

    // Recupero el Carrito
    let arrayCarrito = obtenerCarrito();

    // Reviso si el Carrito tiene productos
    if (arrayCarrito.length === 0) {
        // Si el Carrito esta vacio
        alert('No hay ningún producto guardado en el carrito');
        return;
    }

    // El Carrito NO esta vacio

    // Reviso si Producto ya existe
    const existeEnElCarrito = arrayCarrito.some(producto => producto.nombre == productoNombre);

    if (!existeEnElCarrito) {
        // Si no existe, notifico que no hay mas
        alert(`No hay ${productoNombre} en el carrito`);
        return;
    }

    // Existe el producto

    // Recupero el producto
    let productoEnArray = arrayCarrito.find(producto => producto.nombre == productoNombre);

    // Reviso si la cantidad es 1, ya que al restar va a ser 0
    if (productoEnArray.cantidad === 1) {
        // Si es uno, elimino el producto

        // Recupero el indice
        const indice = arrayCarrito.findIndex(producto => producto.nombre == productoNombre);

        // Elimino
        arrayCarrito.splice(indice, 1);

        // Notifico
        alert(`No hay màs ${productoNombre} en el carrito`);
    } else {
        
        // Si no es uno, puedo continuar restando
        productoEnArray.cantidad--;

        // Notifico
        alert(`Un/una ${productoNombre} fue eliminado del carrito`);
    }

    //Debug Carrito
    console.log(arrayCarrito);

    // Guardo el Carrito
    const arrayCarritoStringify = JSON.stringify(arrayCarrito)
    guardarCarrito(arrayCarritoStringify);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
