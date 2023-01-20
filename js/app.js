
fetch("../json/articulos.json")
    .then(response => response.json())
    .then(articulos => programaTotal(articulos));


    // Funcion geenral contiene todo el programa
    function programaTotal(articulos){
    
    let contenedorRenderCarrito = document.getElementById("contenedorRenderCarrito")
        let contenedoRender = document.getElementById("contenedoRender")

        let carrito = []
        if (localStorage.getItem("carrito")) {
            carrito = JSON.parse(localStorage.getItem("carrito"))
        }
        renderCarrito(carrito)

        //declacion de variables 
        let filtroZapatos = document.getElementById("zapatos")
        let filtroPantalones = document.getElementById("pantalones")
        let filtroBuzos = document.getElementById("buzos")
        let filtroCardigan = document.getElementById("cardigan")
        let filtroCamisas = document.getElementById("camisas")
        let cantidadCarrito = document.getElementById("cantidadCarrito")
        let inicio = document.getElementById("inicio")

        let btnComprar = document.getElementById("comprar")
        btnComprar.addEventListener("click", () => {
            Swal.fire({
                title: 'Gracias por su Compra',
                text: 'Disfrute su Compra',
                imageUrl: '../images/logito.png',
                icon: 'success',
                confirmButtonText: 'Cerrar',
                imageAlt: 'imagen logo',
            })

            localStorage.removeItem("Carrito")
            carrito = []
            renderCarrito(carrito)
        })

        filtroZapatos.addEventListener("click", renderizarArticulosFiltrados)
        filtroZapatos.addEventListener("click", ocultarSlider)
        filtroPantalones.addEventListener("click", renderizarArticulosFiltrados)
        filtroPantalones.addEventListener("click", ocultarSlider)
        filtroBuzos.addEventListener("click", renderizarArticulosFiltrados)
        filtroBuzos.addEventListener("click", ocultarSlider)
        filtroCardigan.addEventListener("click", renderizarArticulosFiltrados)
        filtroCardigan.addEventListener("click", ocultarSlider)
        filtroCamisas.addEventListener("click", renderizarArticulosFiltrados)
        filtroCamisas.addEventListener("click", ocultarSlider)
        inicio.addEventListener("click", volverInicio)

        //funcion de filtrado de articulos 

        function renderizarArticulosFiltrados(e) {
            if (e.target.id == "todos") {
                renderizarContenedor(articulos)
            } else {
                renderizarContenedor(articulos.filter(articulo => articulo.prenda.toLowerCase() == e.target.id))
            }
        }
        comprobacionCarrito(carrito)

        function comprobacionCarrito() {
            if (localStorage.getItem("Carrito")) {
                carrito = JSON.parse(localStorage.getItem("Carrito"))
                renderCarrito(carrito)
            }
        }

        //funcion de filtrado de renderezar articulos 
        function renderizarContenedor(arrayDeProductos) {
            contenedoRender.innerHTML = ""
            for (const producto of arrayDeProductos) {
                let tarjeta = document.createElement("div")
                tarjeta.className = "tarjeta"
                tarjeta.innerHTML = `
        <h3>${producto.nombre}</h3>
        <h4>$${producto.precio}</h4>
        <h4>${producto.marca}</h4>
        <h4>${producto.color}</h4>
        <img src=${producto.imagen}>
        <button class="btn" id= ${producto.id}>Agregar al Carrito</button>
        `
                contenedoRender.appendChild(tarjeta)
            }
            let botones = document.getElementsByClassName("btn")
            for (const btn of botones) {
                btn.addEventListener("click", agreCarrito)
            }
        }


        //funcion de agregar a carrito
        function agreCarrito(e) {
            let articuloBuscado = articulos.find(articulo => articulo.id == e.target.id)
            let posicionArticuloBuscado = carrito.findIndex(articulo => articulo.id == articuloBuscado.id)

            if (posicionArticuloBuscado != -1) {
                carrito[posicionArticuloBuscado].unidades++
                carrito[posicionArticuloBuscado].subtotal = carrito[posicionArticuloBuscado].unidades * carrito[posicionArticuloBuscado].precioUnitario

                carritoJSON = JSON.stringify(carrito)
                localStorage.setItem("Carrito", carritoJSON)
            } else {
                carrito.push({
                    id: articuloBuscado.id, nombre: articuloBuscado.nombre, color: articuloBuscado.color, precioUnitario:
                        articuloBuscado.precio, unidades: 1, subtotal: articuloBuscado.precio

                })
                carritoJSON = JSON.stringify(carrito)
                localStorage.setItem("Carrito", carritoJSON)
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 2000,
                    gravity: "bottom"
                }).showToast();
            }
            localStorage.setItem("Carrito", JSON.stringify(carrito))
            renderCarrito(carrito)
        }

        //funcion de renderizado carrito 
        function renderCarrito(arrayDeProductos) {
            contenedorRenderCarrito.innerHTML = ''
            for (const producto of arrayDeProductos) {
                contenedorRenderCarrito.innerHTML += `
        <div class="flex">
       <div>${producto.nombre}</div>
       <div>${producto.color}</div>
       <div>$${producto.precioUnitario}</div>
       <div>${producto.unidades}</div>
       <div>$${producto.subtotal}</div>
        
        </div>
        `

            }
            let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
            contenedorRenderCarrito.innerHTML += `
        <div class="container-total"><h3>Total De Compra: ${total}$</h3></div>
        `

        }

        function ocultarSlider() {
            document.getElementById("contenedor-slider").style.display = "none";
            document.getElementById("contenedoRender").style.display = "flex";
            Toastify({
                text: "Boton Inicio para ir al Principio",
                duration: 2500,
                gravity: "bottom",
                position: "top-right"
            }).showToast();
        }

        function volverInicio() {
            document.getElementById("contenedor-slider").style.display = "block";
            document.getElementById("contenedoRender").style.display = "none";
        }
        let vaciar = document.getElementById("vaciar")
        vaciar.addEventListener("click", vaciarCarrito)

        function vaciarCarrito() {

                Swal.fire({
                    title: 'Borrado',
                    text: 'Ha borrado los productos',
                    imageUrl: '../images/logito.png',
                    icon: 'warning',
                    confirmButtonText: 'Borrar',
                    imageAlt: 'imagen logo',
                })
            localStorage.removeItem("Carrito")
            carrito = []
            renderCarrito(carrito)
        }
    }








