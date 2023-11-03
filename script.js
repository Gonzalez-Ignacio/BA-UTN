const cards = document.querySelectorAll(".card");
const btnComprar = document.querySelectorAll(".btn-comprar");
const carrito = []
let precioTodosProductos = 0;

// Iterar en cada boton de las cards
btnComprar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        // Obtener Link de imagen
        const imgCard = cards[index].querySelector(".card img").src;
        const imagenProduct = imgCard;
        console.log(imagenProduct);

        // Obtener Titulo
        const titleCard = cards[index].querySelector(".card-title");
        const titleProduct = titleCard.textContent;
        console.log(titleProduct);

        // Obtener Precio
        const priceCardText = cards[index].querySelector(".text-precio");
        const priceText = priceCardText.textContent;
        const priceProduct = parseInt(priceText);
        console.log(priceProduct);

        // Verificamos si el producto ya existe o no
        const productExisting = carrito.findIndex(product => product.titulo === titleProduct);

        if (productExisting !== -1) {
            const amount = carrito[productExisting];
            amount.cantidad++;
        } else {
            // Guardar las productos en el carrito
            carrito.push({ imagen: imgCard, titulo: titleProduct, precio: priceProduct, cantidad: 1 });
        }

        // Eliminar o Agregar clase "fixed" para el botón de Comprar
        claseDeBotonComprar();
        // Agregar "div" Precio Total
        agregarPrecioTotal()
        // Llamar Función para renderizar las cards dentro del carrito de compras.
        renderCard();
    });
});
// Div renderizado dentro del div vació
function renderCard() {
    const cardProduct = carrito.map((product) => `
        <div class="container-carrito"> 
            <div class="columna-carrito"> 
                <img class="imagen-producto" src="${product.imagen}">
            </div>
            <div class="columna-carrito"> 
                <div class="fila-carrito">
                    <h3 class="titulo-producto"> ${product.titulo}</h3>
                </div>
                
                <div class="fila-carrito">
                    <p class="precio-producto">$${product.precio * product.cantidad}</p>
                </div>
                
                <div class="fila-carrito">
                    <div id="carrito-cantidad"> 
                        <button class="cantidad-restar"> - </button>
                        <span class="cantidad-producto"> ${product.cantidad} </span>
                        <button class="cantidad-sumar"> + </button>
                    </div>
                </div>
            </div>
            <div class=""> 
                <img class="imagen-eliminar" src="https://cdn-icons-png.flaticon.com/512/1214/1214594.png">
            </div>
        </div>
    `).join("");
    //renderizar el producto dentro del div vació
    const productEat = document.querySelector(".producto-comida");
    productEat.innerHTML = cardProduct;


    //LLamar boton de restar y sumar la cantidad de productos
    const btnRestar = document.querySelectorAll(".cantidad-restar");
    const btnSumar = document.querySelectorAll(".cantidad-sumar");
    const btnEliminar = document.querySelectorAll(".imagen-eliminar");

    // Restar Producto
    btnRestar.forEach((btnRestarProducto, index) => {
        btnRestarProducto.addEventListener("click", () => {
            const amount = document.querySelectorAll(".cantidad-producto")[index]; //[index] para que itere en todas las cards y no solo la primera
            let amountProduct = parseInt(amount.textContent);
            //Mientras que sea mayor a uno (para que el producto no diga "0")
            if (amountProduct > 1) {
                amountProduct--;
                amount.textContent = amountProduct;
                carrito[index].cantidad = amountProduct;
                carrito[index].precioTotal = carrito[index].cantidad * carrito[index].precio;
                console.log(carrito[index].precioTotal)
                // Actualiza el precio en el HTML
                const precioElement = document.querySelectorAll(".precio-producto")[index];
                precioElement.textContent = `$${carrito[index].precioTotal}`;
                agregarPrecioTotal();
            }
        })
    })

    //Sumar Producto
    btnSumar.forEach((btnSumaProducto, index) => {
        btnSumaProducto.addEventListener("click", () => {
            const amount = carrito[index];
            amount.cantidad++;
            carrito[index].precioTotal = carrito[index].cantidad * carrito[index].precio;
            console.log(carrito[index].precioTotal)
            // Actualiza el precio en el HTML
            const priceRender = document.querySelectorAll(".precio-producto")[index];
            priceRender.textContent = `$${carrito[index].precioTotal}`;
            const amountRender = document.querySelectorAll(".cantidad-producto")[index];
            amountRender.textContent = carrito[index].cantidad;
            console.log(priceRender)
            agregarPrecioTotal();
        })
    })

    // Eliminar Producto
    btnEliminar.forEach((btnEliminarProducto, index) => {
        btnEliminarProducto.addEventListener("click", () => {
            // Eliminación de contenedor
            const deleteElement = document.querySelectorAll(".container-carrito")[index];
            deleteElement.remove()
            // Eliminación desde la lista
            carrito.splice(index, 1);
            // Eliminar o Agregar clase "fixed" para el boton de Comprar
            claseDeBotonComprar();
            // Actualizar Precio al Eliminar
            agregarPrecioTotal();
            // Actualizar vista de boton
            renderCard();
        })
    })
}

// Agregamos Clase al Boton Comprar dentro del carrito y cambiamos la altura del contenedor de todas las cards
function claseDeBotonComprar() {
    const classBtnBuy = document.querySelector(".carrito-vacio");
    const classProductoComida = document.querySelector(".producto-comida");
    if (carrito.length === 0) {
        classBtnBuy.classList.remove("fixed");
        classBtnBuy.textContent = "Carrito de Compras Vacio"
        classProductoComida.classList.remove("altura-container");
    } else {
        classBtnBuy.classList.add("fixed");
        classBtnBuy.textContent = "Finalizar Compra"
        classProductoComida.classList.add("altura-container");
    }
}

// Se agrega el Precio Toal dentro del Carrito
function agregarPrecioTotal() {
    const divPrecioTotal = document.getElementById("precio-total");
    if (carrito.length > 0) {
        precioTodosProductos = 0;

        for (const productosTotal of carrito) {
            precioTodosProductos += productosTotal.precio * productosTotal.cantidad
        }
        const renderPrecioTotal = () => {
            return `
            <div class="container-precio-total"> 
                <span class="texto-precio-total"> Precio Total: </span>
                <span class="precio-total"> $${precioTodosProductos} </span>
            </div>
            `
        }
        divPrecioTotal.innerHTML = renderPrecioTotal(precioTodosProductos)
    } else {
        divPrecioTotal.innerHTML = ""
    }
    renderCard()
}

// Renderizacion de Modal al Finalizar Compra
const btnCompraFinalizada = document.querySelector(".carrito-vacio");
const modal = document.getElementById("modal-compra-finalizada");
const fondoOscuroModal = document.querySelector(".fondo-oscuro-modal");
btnCompraFinalizada.addEventListener("click", () => {
    // Elegir una mesa entre 1 y 20
    const mesaReservada = Math.floor(Math.random() * 20) + 1;
    // Renderizar modal
    if (carrito.length > 0) {
        // Damos estilo para sacar la clase display:none tanto al modal, como al fondo-oscuro-modal
        modal.style.display = "block"
        fondoOscuroModal.style.display = "block"

        // Damos los titulos a mostrar
        const tituloPlatillo = carrito.map(producto => producto.titulo).join(', ');
        // El modal renderiza:
        const renderModal = () => {
            return `
            <div class="container-modal"> 
                <div class="modal-content"> 
                    <span class="modal-close"> <i class="bi bi-x-lg img-close"></i> </span>
                    <h2 class="titulo-modal"> Compra Finalizada </h2>
                    <hr>
                    <p class="texto-modal">Usted tiene reservada la mesa: <span class="texto-relevante-modal">${mesaReservada}</span></p>
                    <p class="texto-modal">Sus platillos seleccionados son: <span class="texto-relevante-modal">${tituloPlatillo}</span></p>
                    <p class="texto-modal">El total a pagar en caja será de: <span class="texto-relevante-modal"> $${precioTodosProductos} </span></p>
                    <hr>
                    <button class="boton-modal"> Aceptar </button>
                </div>
            </div>
        `

        }
        modal.innerHTML = renderModal(precioTodosProductos);
        //Cerrar modal con la imagen "x"
        const btnCloseModal = modal.querySelector(".img-close");
        btnCloseModal.addEventListener("click", () => {
            // Display block a none
            cerrarModal()
        })
        // Cerrar Modal con boton "aceptar"
        const btnModal = modal.querySelector(".boton-modal");
        btnModal.addEventListener("click", () => {
            cerrarModal()
        })
        // Cerrar Modal con click fuera del modal
        fondoOscuroModal.addEventListener("click", () => {
            cerrarModal()
        })
        function cerrarModal() {
            modal.style.display = "none";
            fondoOscuroModal.style.display = "none";
        }
    }

})

// Damos una clase al hacer scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navRestaurante");
    const scrollY = window.scrollY;
    const scrollYPosition = 69

    if (scrollY > scrollYPosition) {
        navbar.classList.add("bg-scroll");
    } else {
        navbar.classList.remove("bg-scroll");
    }
})