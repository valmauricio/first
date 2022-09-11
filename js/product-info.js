let categoriesArray = [];
const boton = document.getElementById('boton');
const buscador = document.getElementById('buscador');
const lista = document.getElementById('lista');


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



function showObjInfo() {
    let innerinfo = "";
    let innerinfo2 = "";
    
    // for (let i = 0; i < array.length; i++) {
    //   let category = array[i];
      innerinfo +=
        `
          
        <div class="list-group-item">
              <div class="row">
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <div class="mb-1">
                          <h2>${infoData.name}</h2> </br> <hr> <h3>Precio:</h3><h6>${infoData.currency}${infoData.cost}</h6>
                          </br>
                          <h3>Descripción:</h3>
                          <p>  ${infoData.description} </p> 
                          </br>
                          <h3>Categoría:</h3>
                          <p>${infoData.category}</p>
                          </br>
                          <h3>Cantidad de vendidos:</h3>
                          <p>${infoData.soldCount}</p>
                          </br>
                          <h3>Imágenes ilustrativas:</h3>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          `;
           for (let i = 0; i < infoData.images.length; i++) {
                   let pic = infoData.images[i];
                   innerinfo2 += `
                   <div class="col-3">
                      <img src="${pic} " alt="product image" class="img-thumbnail"></img>
                 </div>
                 `
                }

      document.getElementById("infocontainer").innerHTML =
        innerinfo;
        document.getElementById("imginfo").innerHTML =
        innerinfo2;
      
      }
//   }
  




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("objID") + EXT_TYPE).then(
        function (resultObj) {
            if (resultObj.status === "ok") {
                
                infoData = resultObj.data;
                showObjInfo();
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


            } else {
                document.getElementById("usuario").innerHTML = usuario;
            }

            document.getElementById("cerrar").addEventListener("click", () => {
                cerrar();
            });
        }
    );




    
});
