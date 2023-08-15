document.addEventListener("DOMContentLoaded", () => {
  // Obtener referencias a elementos del DOM
  const form = document.getElementById("clienteForm");
  const vinosSelect = document.getElementById("vinosSelect");
  const carritoList = document.getElementById("carritoList");
  const totalCompra = document.getElementById("totalCompra");

  // Función para crear las opciones del menú desplegable
  function crearOpcionesVinos() {
    vinos.forEach((vino) => {
      const option = document.createElement("option");
      option.value = vino.id;
      option.textContent = `${vino.nombre} - $${vino.precio}`;
      vinosSelect.appendChild(option);
    });
  }

  // Llamar a la función para crear las opciones del menú desplegable
  crearOpcionesVinos();

  // Variable para almacenar los productos seleccionados
  const carritoProductos = [];

// Función para quitar producto del carrito
function quitarDelCarrito(producto) {
  const index = carritoProductos.indexOf(producto);
  if (index !== -1) {
    carritoProductos.splice(index, 1);
    mostrarResumenCompra();
  }
}

  // Función para mostrar el resumen de la compra
  function mostrarResumenCompra() {
    carritoList.innerHTML = ""; // Limpiar el contenido previo del carrito
  
    let total = 0;
    carritoProductos.forEach((producto) => {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - $${producto.precio}`;
  
      const quitarBtn = document.createElement("button");
      quitarBtn.textContent = "Quitar";
      quitarBtn.addEventListener("click", () => quitarDelCarrito(producto)); // Llamada a la función de quitar
      item.appendChild(quitarBtn);
  
      carritoList.appendChild(item);
      total += producto.precio;
    });
  
    totalCompra.textContent = total;
  }
  

  // Agregar evento al formulario para realizar la compra
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Obtener datos del cliente
    const edad = parseInt(event.target.edad.value);
    const apellido = event.target.apellido.value;
    const nombre = event.target.nombre.value;
    const mail = event.target.mail.value;

    // Validar edad
    if (edad < 18) {
      Swal.fire('Lo sentimos, sos menor de edad, no podemos aceptar tu compra');
      return;
    }

    // Confirmar datos ingresados
    Swal.fire({
      title: 'Quieres confirmar la compra?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    })
    
    // Obtener el vino seleccionado
    const vinoId = parseInt(vinosSelect.value);
    const vinoSeleccionado = vinos.find((vino) => vino.id === vinoId);

    // Agregar el vino seleccionado al carrito
    carritoProductos.push(vinoSeleccionado);
    // Mostrar resumen de la compra
    mostrarResumenCompra();

    
  });
});


  






