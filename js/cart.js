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


function valor(numb){
    document.getElementById('fijo2').innerHTML = numb * document.getElementById('fijo').value
}

function showCartInfo() {
   let cartissues = ""
   
   for (let i = 0; i < cartInfo.length; i++) {
    let com = cartInfo[i];
    
    
//       cartissues += `<h3 class="col-3">${com.name} </h3> <div class="col-3"><img src="${com.image} "  alt="product image" class="img-thumbnail list-group-item-action"></img></div>`
//    }

cartissues += 
`<tr>
<th scope="row"><img src="${com.image}"  alt="image" class="img-fluid" style="max-width: 15%; height: auto;"></img></th>
<td>${com.name}</td>
<td>${com.currency +" "+ com.unitCost}</td>
<td><input id="fijo" type="number"  class="form-control" value=1 onchange="valor(${com.unitCost})"></input></td>
<td id="fijo2">${com.unitCost * com.count}</td>
</tr>`
}
    document.getElementById('cartinfo').innerHTML += cartissues
//    document.getElementById('ida').addEventListener("change", () => {
//     com.count = document.getElementById('ida').value;
    
//   });
    
}


document.addEventListener("DOMContentLoaded", function (e) {

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



            getJSONData(CART_INFO_URL +25801+ EXT_TYPE).then(
                function (resultObj) {
                    if (resultObj.status === "ok") {
        
                        cartInfo = resultObj.data.articles;
                        showCartInfo();
                        
                    }
                })

            
})