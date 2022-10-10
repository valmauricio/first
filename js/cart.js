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
      localStorage.removeItem("cartArray");
      location.href = "login.html";
      
    }
  });
}

function valor(numb,par2,par3) {
  document.getElementById(par3).innerHTML =
    numb * document.getElementById(par2).value;
}

function showCartInfo() {
  let cartissues = "";

  for (let i = 0; i < cartInfo.length; i++) {
    let com = cartInfo[i];

    cartissues += `<tr>
<th scope="row"><img src="${
      com.image
    }"  alt="image" class="img-fluid" style="max-width: 50%; height: auto;"></img></th>
<td class="col-2">${com.name}</td>
<td class="col-2">${com.currency + " " + com.unitCost}</td>
<td class="col-4"><input id="${[i]}" type="number"  class="form-control" value=1 onchange="valor(${
      com.unitCost
    },'${[i]}','${[i]}w')" style="width: 4em;"></input></td>
<td class="col-2"><b>${com.currency + " "}<span id="${[i]}w"> ${
      com.unitCost * com.count
    }</span></b></td>
</tr>`;
  }
  document.getElementById("cartinfo").innerHTML += cartissues;
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

  getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartInfo = resultObj.data.articles;
      if (JSON.parse(localStorage.getItem("cartArray")) == null) {
      } else {
        JSON.parse(localStorage.getItem("cartArray")).find((object) => {
          cartInfo.push(object);
        });
      }
      showCartInfo();
    }
  });
});
