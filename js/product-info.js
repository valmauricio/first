
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
function indexSet(index) {
    localStorage.setItem("nro", index)
}
function palClick(pic) {
    indexSet(pic);
    Swal.fire({
        showCloseButton: true,
        showConfirmButton: false,
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
    innerinfo += `   <div class="col">  
                          <h2>${infoData.name}</h2> </br> <hr size="18px" color="black" /> <h3>Precio:</h3><h6>${infoData.currency}${infoData.cost}</h6>
                          </br>
                          <h3>Descripción:</h3>
                          <p>  ${infoData.description} </p> 
                          </br>
                          <h3>Categoría:</h3>
                          <p>${infoData.category}</p>
                          </br>
                          <h3>Cantidad de vendidos:</h3>
                          <p>${infoData.soldCount}</p>    
                  </div>`;
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

function showObjComments() {
    let innerComments = "";
            
    for (let i = 0; i < commentsData.length; i++) {
        let com = commentsData[i];
        
            let estrellitas="";
            for (let i = 1; i<=5; i ++){
                if (i<com.score){
                    estrellitas += '<span class="fa fa-star checked"></span>';
                } else {
                    estrellitas += '<span class="fa fa-star"></span>'
                }
            }
            
        
        innerComments += `<div class="col-7 list-group-item">
        
        <h5><b>${com.user}</b> - ${com.dateTime} - <span>${estrellitas}</span></h5>
        <p>${com.description}</p>
        
        </div>`;
        
    }
    document.getElementById("comments").innerHTML =
        innerComments;
}



function goToProd(foto){
    localStorage.removeItem("objID")
    localStorage.setItem("objID", (foto))
    window.location = "product-info.html"

}


function showImgRel(producto) {
   
   document.getElementById("imgrelinfo").innerHTML += `
               
                  <img src="${producto.images[0]} " onclick="goToProd(${producto.id})" alt="product image" class="img-thumbnail list-group-item-action"></img>
             
             `
   


    
        
}

function showImgRelB(producto) {
     
    document.getElementById("imgrelinfo2").innerHTML += `
                
                   <img src="${producto.images[0]} " onclick="goToProd(${producto.id})" alt="product image" class="img-thumbnail list-group-item-action"></img>
              
              `
    
 
 
     
         
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

    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("objID") + EXT_TYPE).then(
        function (resultObj) {
            if (resultObj.status === "ok") {

                commentsData = resultObj.data;
                showObjComments();
                
            }
        })
        

        getJSONData(PRODUCT_INFO_URL + (parseInt(localStorage.getItem("objID")) + 1 ) + EXT_TYPE).then(
            function (resultObj) {
                if (resultObj.status === "ok") {
    
                    imgreldata = resultObj.data;
                    showImgRel(imgreldata);
                    
                } else {
                    getJSONData(PRODUCT_INFO_URL + (parseInt(localStorage.getItem("objID")) - 1 ) + EXT_TYPE).then(
                        function (resultObj) {
                            if (resultObj.status === "ok") {
                
                                imgreldata = resultObj.data;
                                showImgRel(imgreldata);
                                
                            }
                        })
                }
            })



            getJSONData(PRODUCT_INFO_URL + (parseInt(localStorage.getItem("objID")) - 2 ) + EXT_TYPE).then(
                function (resultObj) {
                    if (resultObj.status === "ok") {
        
                        imgreldatab = resultObj.data;
                        showImgRelB(imgreldatab);
                        
                        
                    } else {
                        getJSONData(PRODUCT_INFO_URL + (parseInt(localStorage.getItem("objID")) + 2 ) + EXT_TYPE).then(
                            function (resultObj) {
                                if (resultObj.status === "ok") {
                    
                                    imgreldatab = resultObj.data;
                                    showImgRelB(imgreldatab);
                                    
                                    
                                }
                            })
                    }
                })





                

document.getElementById('btncom').addEventListener('click',()=>{
    let hoy = new Date();
                let tiempo = hoy.toLocaleTimeString();
                let fechas = hoy.toLocaleDateString();
commentsData.push({
    "product": parseInt(localStorage.getItem("objID")),
    "score": parseInt(document.getElementById('puntaje').value),
    "description": document.getElementById('newcom').value,
    "user": localStorage.getItem('user'),
    "dateTime": fechas+"-"+tiempo
})
showObjComments()

})


});
