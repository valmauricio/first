function cerrar() {
    
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
function indexSet(index){
    localStorage.setItem("nro",index)
}
function palClick(pic){
    indexSet(pic);
    Swal.fire({
        
        text: 'Imágenes meramente ilustrativas',
        imageUrl: infoData.images[localStorage.getItem("nro")],
        imageWidth: 500,
        imageHeight: 300,
        imageAlt: 'Custom image',
      })
}


function showObjInfo() {
    let innerinfo = "";
    let innerinfo2 = "";
      innerinfo +=`   
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
                   <div class="col-3" onclick="palClick(${infoData.images.indexOf(pic)})" >
                      <img src="${pic} "  alt="product image" class="img-thumbnail list-group-item-action"></img>
                 </div>
                 `
                }

      document.getElementById("infocontainer").innerHTML =
        innerinfo;
        document.getElementById("imginfo").innerHTML =
        innerinfo2;
      
      }

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
