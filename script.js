const cards = document.querySelectorAll(".card");
const btnComprar = document.querySelectorAll(".btn-comprar");
const carrito = []

// Iterar en cada boton de las cards
btnComprar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        // Obtener Link de imagen
        const imgCard = cards[index].querySelector(".card img").src;
        const imagenProduct = imgCard
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
        
        // Guardar las productos en el carrito
        carrito.push({imagen:imgCard, titulo:titleProduct, precio:priceProduct});
        
        // LLamar Funcion para renderizar las cards dentro del carrito de compras.
        renderCard(priceProduct);
    })
})
// Div renderizado dentro del div vació
function renderCard(priceProduct) {
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
                    <p class="precio-producto">$${product.precio}</p>
                </div>
                
                <div class="fila-carrito">
                    <div id="carrito-cantidad"> 
                        <button class="cantidad-restar"> - </button>
                        <span class="cantidad-producto"> 1 </span>
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
    const btnRestar= document.querySelectorAll(".cantidad-restar");
    const btnSumar = document.querySelectorAll(".cantidad-sumar");

    // Restar Producto
    btnRestar.forEach((btnResta, index) => {
        btnResta.addEventListener("click", () => {
            const amount = document.querySelectorAll(".cantidad-producto")[index]; //[index] para que itere en todas las cards y no solo la primera
            let amountProduct = parseInt(amount.textContent);
            //Mientras que sea mayor a uno (para que el producto no diga "0")
            if (amountProduct > 1) {
                amountProduct --;
                amount.textContent = amountProduct;
                carrito[index].cantidad = amountProduct;
                carrito[index].precioTotal = carrito[index].cantidad * carrito[index].precio;
                console.log(carrito[index].precioTotal)
                // Actualiza el precio en el HTML
            const precioElement = document.querySelectorAll(".precio-producto")[index];
            precioElement.textContent = `$${carrito[index].precioTotal}`;
            }
        })
    })

    //Sumar Producto
    btnSumar.forEach((btnSuma, index) => {
        btnSuma.addEventListener("click", () => {
            const amount = document.querySelectorAll(".cantidad-producto")[index];
            let amountProduct = parseInt(amount.textContent);
            amountProduct ++
            amount.textContent = amountProduct;
            carrito[index].cantidad = amountProduct;
            carrito[index].precioTotal = carrito[index].cantidad * carrito[index].precio;
            console.log(carrito[index].precioTotal)
            // Actualiza el precio en el HTML
            const precioElement = document.querySelectorAll(".precio-producto")[index];
            precioElement.textContent = `$${carrito[index].precioTotal}`;
        })
    })
}

