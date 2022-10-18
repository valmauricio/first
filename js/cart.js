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

function deleteCart(){
  localStorage.removeItem('cartArray');
  cartInfo = [];
  document.getElementById("cartinfo").innerHTML = ""
  
}

function valor(numb,par2,par3) {
  document.getElementById(par3).innerHTML =
    numb * document.getElementById(par2).value;
}

function payMethod() {
  Swal.fire({
    title: '<strong>Forma de pago</strong><hr>',
    
    html:'<div class="container"><input onchange="desabilitar()" type="radio" id="r1" name="choose" value="Tarjeta de credito">Tarjeta de credito<hr></div>' +
    '<div class="container row"><div class="col"><label>Numero de tarjeta</label><input id="r10" class="form-control" type="number"><br><label>Vencimiento (MM/AA)<label><input id="r11" class="form-control" type="date"></div><div class="col"><label>Codigo de seguridad</label><input id="r12" style="width: 50%;" class="form-control" type="number"></div></div><br>'+
    '<hr><div class="container"><input type="radio" onchange="desabilitar()" id="r2" name="choose" value="Transferencia bancaria"> Transferencia bancaria <hr> <label>Numero de cuenta</label><input id="r20" class="form-control r2" type="number"></div><hr>'+
    '<button class="btn btn-info" id="select">Guardar seleccion</button>',
    showCloseButton: false,
    showCancelButton: false,
    
    confirmButtonText:
      'Cerrar',
    
   
  })
  document.getElementById('select').addEventListener("click", () => {
    selectPay();
  });

}

function selectPay() {
  const radios = document.getElementsByName('choose');

for (var i = 0; i <  radios.length; i++) {
  if (radios[i].checked) {
    document.getElementById('selected').innerHTML = radios[i].value
    break;
  }
}

}

function desabilitar()
{
    var radio1 = document.getElementById('r1').checked;
    var inputs = document.getElementById('r20');
    if (radio1 === true) {
        inputs.disabled = true;
    } else if (radio1 === false) {
        inputs.disabled = false;
    }
    var radio2 = document.getElementById('r2').checked;
    var inputs2 = document.getElementById('r10');
    var inputs3 = document.getElementById('r11');
    var inputs4 = document.getElementById('r12');
    if (radio2 === true) {
        inputs2.disabled = true;
        inputs3.disabled = true;
        inputs4.disabled = true;
    } else if (radio2 === false) {
        inputs2.disabled = false;
        inputs3.disabled = false;
        inputs4.disabled = false;
    }

}

function subTotal() {
  const dolares = document.getElementsByClassName('USD')
  // console.log(parseInt(dolares[0].innerHTML))
  let com = 0;
  for (let i = 0; i <  dolares.length; i++) {
    console.log(parseInt(dolares[i].innerHTML))
     com += parseInt(dolares[i].innerHTML);


  //   let sum = 0;

  //   for (let i = 0; i < array.length; i++) {
  //     sum += array[i];
  // }
  // console.log(sum);
      document.getElementById("productCostTotal") .innerHTML =  com
      
    
  }

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
<td class="col-4"><input id="${[i]}" type="number"  class="form-control" value=1 min=0 onchange="valor(${
      com.unitCost
    },'${[i]}','${[i]}w')" style="width: 4em;"></input></td>
<td class="col-2"><b>${com.currency + " "}<span class="${com.currency}" id="${[i]}w"> ${
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
      subTotal()
    }
  });

  document.getElementById('deletec').addEventListener("click", () => {
    deleteCart();
  });
  document.getElementById('modal').addEventListener("click", () => {
    payMethod();
  });
  
});
