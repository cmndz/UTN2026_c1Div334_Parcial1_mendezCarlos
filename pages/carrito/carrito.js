function obtenerCarrito() {
    let arrayCarrito = localStorage.getItem('carritoEnLocalStorage');
    if (arrayCarrito) {
        return JSON.parse(arrayCarrito);
    } else {
        return []; //Si no lo encuentra, no existe, entonces devuelve un array vacio
    }
}

function cargarProductosCarrito() {
    // Recupero la tabla del DOM
    let tabla = document.getElementById("tabla-carrito");

    // Recupero el Carrito
    let arrayCarrito = obtenerCarrito();

    // Seteo el valor final
    let valorFinal = 0;


    let tablaFilas = '<tbody class="tabla-filas">';
    // SI tengo productos
    if (arrayCarrito.length > 0) {

        arrayCarrito.forEach((producto) => {
            // Genero los nodos
            tablaFilas += `<tr>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
        </tr>`;

            // Sumarizo el valor final
            valorFinal += (producto.cantidad * parseInt(producto.precio.replace('$', '')));

        });
    }
    tablaFilas += '</tbody>';

    // Busco el tbody del DOM y lo elimino
    let tbody = tabla.querySelector("tbody.tabla-filas");
    if (tbody) tbody.remove();

    // Agregacion de los Nodos al DOM
    tabla.innerHTML += tablaFilas;

    // Recupero el contenedor del valor final y lo actualizo
    let contenedorValorFinal = document.getElementById("valor-final");
    contenedorValorFinal.textContent = `El valor final a pagar es de: $ ${valorFinal}`

}

function limpiarCarrito() {
    // Limpio localStorage
    localStorage.clear();

    // Actualizo el visual del Carrito
    cargarProductosCarrito();

    // Notifico que se limpio
    alert('Carrito limpiado correctamente');
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});