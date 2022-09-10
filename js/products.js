//array donde se cargarán los datos recibidos:
let categoriesArray = [];
const boton = document.getElementById('boton');
const buscador = document.getElementById('buscador');
const lista = document.getElementById('lista');

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array) {
  let htmlContentToAppend = "";
  
  for (let i = 0; i < array.length; i++) {
    let category = array[i];
    htmlContentToAppend +=
      `
        
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      category.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
      category.name +
      " " +
      "-" +
      " " +
      category.currency +
      " " +
      category.cost +
      `</h4> 
                        <p> ` +
      category.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      category.soldCount +
      ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
    document.getElementById("cat").innerHTML =
      `<p class="centrado">Verás aquí todos los productos de la categoría <b>` +
      nombres +
      `</b></p>`;
    }
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(
    function (resultObj) {
      if (resultObj.status === "ok") {
        nombres = resultObj.data.catName;
        categoriesArray = resultObj.data.products;
        showCategoriesList(categoriesArray);
      }
      let usuario = localStorage.getItem("user");
      if (usuario == null) {
        Swal.fire({
          text: "Es necesario estar logueado para ver la página",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",

          allowOutsideClick: false,
          stopKeyDownPropagation: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.href = "login.html";
          }
        });

        //alert("Es necesario autenticarse para ver la página");
      } else {
        document.getElementById("usuario").innerHTML = usuario;
      }

      document.getElementById("cerrar").addEventListener("click", () => {
        cerrar();
      });
    }
  );



  

  function cerrar() {
    // alert("Has cerrado sesión");

    Swal.fire({
      title: "Seguro que deseas cerrar sesión?",
      text: "perderas el progreso guardado en tu carrito de compras",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Has cerrado sesión");
        localStorage.removeItem("user");
        location.href = "login.html";
      }
    });
  }

  function filtrar() {
    //parseInt porque es un string, y necesito un integer
    let inicial = parseInt(
      document.getElementById("rangeFilterCountMin").value
    ); //tomo el valor mínimo
    let final = parseInt(document.getElementById("rangeFilterCountMax").value); //tomo el valor máximo

    let listaFiltrada = categoriesArray.filter(
      (miArr) => miArr.cost > inicial && miArr.cost < final
    );
    //   // arr.sort((a,b)=>a-b)
    //  ¿ listaFiltrada.sort((ant,sig)=>ant.cost-sig.cost);
    showCategoriesList(listaFiltrada);
    // console.log(listaFiltrada);
  }

  document.getElementById("rangeFilterCount").addEventListener("click", () => {
    filtrar();
  });

  function limpiar() {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    showCategoriesList(categoriesArray);
  }

  

  document.getElementById("sortDesc").addEventListener("click", () => {
    categoriesArray.sort((ant,sig)=>ant.cost-sig.cost);
    showCategoriesList(categoriesArray);
  });
  document.getElementById("sortAsc").addEventListener("click", () => {
    categoriesArray.sort((ant,sig)=>sig.cost-ant.cost);
    showCategoriesList(categoriesArray);
  });
  document.getElementById("sortByCount").addEventListener("click", () => {
    categoriesArray.sort((ant,sig)=>sig.soldCount-ant.soldCount);
    showCategoriesList(categoriesArray);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", () => {
    limpiar();
  });


  
const buscar = ()=>{
  // console.log(buscador.value);
  htmlContentToAppend = '';
  
  
  const texto = buscador.value.toLowerCase();
  for(let producto of categoriesArray){
      let nombre = producto.name.toLowerCase();
      if(nombre.indexOf(texto) !== -1){
  htmlContentToAppend += 
  `
        
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      producto.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
      producto.name +
      " " +
      "-" +
      " " +
      producto.currency +
      " " +
      producto.cost +
      `</h4> 
                        <p> ` +
      producto.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      producto.soldCount +
      ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
    document.getElementById("cat").innerHTML =
      `<p class="centrado">Verás aquí todos los productos de la categoría <b>` +
      nombres +
      `</b></p>
  `
      }
  }
  if(htmlContentToAppend === ""){
    
      // alert("no"); 
      Swal.fire({
        text: "Lo sentimos, no contamos con el producto que estás buscando",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
 })
        
  }
  }

  boton.addEventListener('click', buscar);
buscador.addEventListener('keyup', buscar);
});
