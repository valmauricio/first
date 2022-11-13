const radioH1 = document.getElementById("r1");
const radioH2 = document.getElementById("r2");
const inputZero = document.getElementsByName("zero");

//Validación de formulario
(function () {
  "use strict";

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll(".needs-validation");

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");

        if (!radioH1.checked && !radioH2.checked) {
          document.getElementById("but").innerHTML =
            "Debe seleccionar una forma de pago";
            
        } 
      },
      false
    );
  });
})();
//La cantidad nunca puede ser 0
function Zero() {
  for (let i = 0; i < inputZero.length; i++) {
    let input = inputZero[i];
    if (input.value == 0) {
      input.value = 1;
    }
  }
}
//Función que se utiliza para cerrar sesión
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
//Eliminar carrito completo
function deleteCart() {
  localStorage.removeItem("cartArray");
  cartInfo = [];
  document.getElementById("cartinfo").innerHTML = "";
  final();
}
//Calcular precio por cantidad
function valor(numb, par2, par3) {
  document.getElementById(par3).innerHTML =
    numb * document.getElementById(par2).value;
}




//Elegir método de pago
function selectPay() {
  const radios = document.getElementsByName("choose");

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      document.getElementById("selected").innerHTML = radios[i].value;

      break;
    }
  }
  document.getElementById("but").innerHTML = "";
}


function final() {
  subTotal();
  selectEnv();
  total();
}
// Calculo el subtotal sin el costo de envio
function subTotal() {
  const dolares = document.getElementsByClassName("USD");
  const pesos = document.getElementsByClassName("UYU");
  let dol = 0;
  let pes = 0;
  for (let i = 0; i < dolares.length; i++) {
    dol += parseFloat(dolares[i].innerHTML);
  }
  for (let i = 0; i < pesos.length; i++) {
    pes += parseFloat(pesos[i].innerHTML);
  }
  document.getElementById("productCostTotal").innerHTML = (
    pes / 40 +
    dol
  ).toFixed(2);
}
//Calculo el costo de envío
function selectEnv() {
  const radios = document.getElementsByName("radioenv");
  const sub = document.getElementById("productCostTotal").innerHTML;
  let radioResult = 0;
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radioResult = radios[i].value;

      document.getElementById("comissionText").innerHTML = (
        (parseFloat(radioResult) * parseFloat(sub)) /
        100
      ).toFixed(2);
      break;
    }
  }
}
//Calculo el subtotal con el costo de envío
function total() {
  let sub = document.getElementById("productCostTotal").innerHTML;
  let env = document.getElementById("comissionText").innerHTML;
  document.getElementById("totalCostText").innerHTML = (
    parseFloat(sub) + parseFloat(env)
  ).toFixed(2);
}
//Función para deshabilitar el input que no se usa
function desabilitar() {
  var radio1 = document.getElementById("r1").checked;
  var inputs = document.getElementById("r20");
  if (radio1 === true) {
    inputs.value = "";
    inputs.disabled = true;
  } else if (radio1 === false) {
    inputs.disabled = false;
  }
  var radio2 = document.getElementById("r2").checked;
  var inputs2 = document.getElementById("r10");
  var inputs3 = document.getElementById("r11");
  var inputs4 = document.getElementById("r12");
  if (radio2 === true) {
    inputs2.value = "";
    inputs2.disabled = true;
    inputs3.value = "";
    inputs3.disabled = true;
    inputs4.value = "";
    inputs4.disabled = true;
  } else if (radio2 === false) {
    inputs2.disabled = false;
    inputs3.disabled = false;
    inputs4.disabled = false;
  }
}
//Eliminar un producto de la lista
function arrayDeleted(nombre) {
  let deleted = cartInfo.filter((item) => item.name !== nombre);
  

  localStorage.removeItem("cartArray");
  cartInfo = deleted;
  localStorage.setItem("cartArray", JSON.stringify(deleted));
}
function deleteOne(id) {
  let element = document.getElementById(id);
  return element.parentNode.removeChild(element);
}
//Mostrar lista de productos a comprar
function showCartInfo() {
  let cartissues = "";

  for (let i = 0; i < cartInfo.length; i++) {
    let com = cartInfo[i];

    cartissues += `<tr id="${[i]}del">
<th scope="row"><img src="${
      com.image
    }"  alt="image" class="img-fluid" style="max-width: 50%; height: auto;"></img></th>
<td class="col-2">${com.name}</td>
<td class="col-2">${com.currency + " " + com.unitCost}</td>
<td class="col-2"><input id="${[i]}" type="number"  class="form-control" name="zero" value=1 min=1 onkeyup="Zero(), valor(${
      com.unitCost
    },'${[i]}','${[i]}w')" onchange="valor(${com.unitCost},'${[i]}','${[i]}w'), subTotal(), selectEnv(), total()" style="width: 5em;" required></input></td>
<td class="col-2"><b>${com.currency + " "}<span class="${com.currency}" id="${[i]}w"> ${
      com.unitCost * com.count
    }</span></b></td><td><button class="btn btn-danger" onclick="deleteOne('${[i]}del'), final(), arrayDeleted('${
      com.name}')"><i class="fa fa-trash" aria-hidden="true"></i>
    </button></td>
</tr>`;
  }
  document.getElementById("cartinfo").innerHTML += cartissues;
}

document.addEventListener("DOMContentLoaded", function (e) {
  //Verificación de logueo
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
      
      if (
        JSON.parse(localStorage.getItem("cartArray")) == null ||
        JSON.parse(localStorage.getItem("cartArray")).length == 0
      ) {
        //Si el carrito está vaciío , cargo el peugeot del json
        cartInfo = resultObj.data.articles;
      } else {
        //Sino, cargo los productos de mi carrito
        cartInfo = [];
        JSON.parse(localStorage.getItem("cartArray")).find((object) => {
          cartInfo.push(object);
        });
      }
    }
    showCartInfo();
    subTotal();
    selectEnv();
    total();
    selectPay();
    desabilitar();
  });

  document.getElementById("deletec").addEventListener("click", () => {
    deleteCart();
  });
  
  document.getElementById("select").addEventListener("click", () => {
    selectPay();
    
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Datos almacenados",
      showConfirmButton: false,
      timer: 1500,
    });
  });
});
