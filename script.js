emailjs.init("a.riveroo");  // Cambia esto por tu User ID de EmailJS

let cesta = []; // Array para almacenar las pegatinas seleccionadas

// Función para agregar pegatinas a la cesta
function agregarACesta(tamaño, precio) {
    cesta.push({ tamaño, precio });
    actualizarCesta();
}

// Función para actualizar la cesta
function actualizarCesta() {
    const listaCesta = document.getElementById('lista-cesta');
    listaCesta.innerHTML = ''; // Limpiar la lista antes de agregar los productos

    let total = 0;

    cesta.forEach((producto) => {
        const item = document.createElement('li');
        item.textContent = `${producto.tamaño} - ${producto.precio}€`;
        listaCesta.appendChild(item);
        total += producto.precio;
    });

    // Mostrar el total actualizado
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: ${total.toFixed(2)}€`;
}

// Función para vaciar la cesta
function vaciarCesta() {
    cesta = []; // Vaciar el array de la cesta
    actualizarCesta();
}

// Función para realizar el pedido y enviar el correo
function realizarPedido() {
    if (cesta.length === 0) {
        alert("¡Tu cesta está vacía! Agrega productos para realizar el pedido.");
        return;
    }

    let productosPedido = cesta.map((producto) => `${producto.tamaño}: ${producto.precio}€`).join("\n");
    let total = cesta.reduce((total, producto) => total + producto.precio, 0);

    // Preparar los datos para enviar a EmailJS
    const pedidoDatos = {
        to_email: "nintendoswitchguest402@gmail.com",  // Correo destino
        message: `Nuevo pedido de Pegatinas Ale:\n\n${productosPedido}\n\nTotal: ${total.toFixed(2)}€`,
        user_name: "Cliente Anónimo",  // Puedes poner el nombre del cliente si lo deseas
        total: total.toFixed(2)
    };

    // Intentar enviar el correo con EmailJS
    emailjs.send("service_ox4eyz6", "9rgqwgi", pedidoDatos)
        .then(function(response) {
            alert("¡Pedido realizado con éxito! Te enviaremos un correo de confirmación.");
            vaciarCesta(); // Vaciar la cesta después de realizar el pedido
        }, function(error) {
            alert("Hubo un error al enviar el pedido. Intenta de nuevo.");
            console.log("Error al enviar el correo:", error);  // Muestra detalles del error en la consola
        });
}