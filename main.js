document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("clienteForm");
  const vinosSelect = document.getElementById("vinosSelect");
  const carritoList = document.getElementById("carritoList");
  const totalCompra = document.getElementById("totalCompra");

  function crearOpcionesVinos() {
    vinos.forEach((vino) => {
      const option = document.createElement("option");
      option.value = vino.id;
      option.textContent = `${vino.nombre} - $${vino.precio}`;
      vinosSelect.appendChild(option);
    });
  }
  crearOpcionesVinos();
  const carritoProductos = [];
function quitarDelCarrito(producto) {
  const index = carritoProductos.indexOf(producto);
  if (index !== -1) {
    carritoProductos.splice(index, 1);
    mostrarResumenCompra();
  }
}
  function mostrarResumenCompra() {
    carritoList.innerHTML = ""; 
  
    let total = 0;
    carritoProductos.forEach((producto) => {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - $${producto.precio}`;
  
      const quitarBtn = document.createElement("button");
      quitarBtn.textContent = "Quitar";
      quitarBtn.addEventListener("click", () => quitarDelCarrito(producto)); 
      item.appendChild(quitarBtn);
  
      carritoList.appendChild(item);
      total += producto.precio;
    });
  
    totalCompra.textContent = total;
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const edad = parseInt(event.target.edad.value);
    const apellido = event.target.apellido.value;
    const nombre = event.target.nombre.value;
    const mail = event.target.mail.value;

    if (edad < 18) {
      Swal.fire('Lo sentimos, sos menor de edad, no podemos aceptar tu compra');
      return;
    }
    Swal.fire({
      title: 'Quieres confirmar la compra?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    })
    
    const vinoId = parseInt(vinosSelect.value);
    const vinoSeleccionado = vinos.find((vino) => vino.id === vinoId);
    carritoProductos.push(vinoSeleccionado);

    mostrarResumenCompra();

  });
});


  






