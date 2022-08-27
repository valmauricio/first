




//array donde se cargarán los datos recibidos:
let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        let category = array.products[i];
        htmlContentToAppend += `
        
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+  category.name +" "+"-"+" "+ category.currency +" "+ category.cost +`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = `<p class="centrado">Verás aquí todos los productos de la categoría <b>`+ array.catName +`</b></p>` + htmlContentToAppend; 
    }
}


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray); //arry
        }
        let usuario = localStorage.getItem('user');
if (usuario == null) {
    
    Swal.fire({
        
        text: "Es necesario estar logueado para ver la página",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        
        allowOutsideClick: false,
        stopKeyDownPropagation: true,
      }).then((result) => {
        if (result.isConfirmed) {
          
          location.href = 'login.html';
        }
      })
    
    
    
    
    
    //alert("Es necesario autenticarse para ver la página");
    
} else {

    document.getElementById('usuario').innerHTML = usuario;
    }
    
    document.getElementById('cerrar').addEventListener('click',()=>{
        cerrar();
    });
    });
    
    function cerrar(){
        
        // alert("Has cerrado sesión");
       
         
         Swal.fire({
             title: 'Seguro que deseas cerrar sesión?',
             text: "perderas el progreso guardado en tu carrito de compras",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Sí, deseo cerrar sesión',
             cancelButtonText: 'Cancelar'
           }).then((result) => {
             if (result.isConfirmed) {
               Swal.fire(
                 
                 'Has cerrado sesión',
                 
                 
               )
               localStorage.removeItem('user');
               location.href = 'login.html';
             }
           })
         
         
         }
});