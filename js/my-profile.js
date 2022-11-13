let perfil = []

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
//Función para agregar los datos del usuario
function addPerf(){
let name = document.getElementById('name1').value;
let surname = document.getElementById('surname1').value;
let email = document.getElementById('email1').value;
let name2 = document.getElementById('name2').value;
let surname2 = document.getElementById('surname2').value;
let tel = document.getElementById('tel1').value;


    perfil.push({
        "name": name,
        "surname": surname,
        "email": email,
        "name2": name2,
        "surname2": surname2,
        "tel": tel
    })
}

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
             
          } else {
            perfil = [];
            addPerf();
            //Guardo todo en localstorage con el nombre de usuario en la key para futuros inicios de sesión
            localStorage.setItem(`${usuario.innerHTML}`,JSON.stringify(perfil));
              
          
          }
  
          form.classList.add("was-validated");
  
          
        },
        false,
        
      );
    });
  })();

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
                document.getElementById("email1").value = usuario;
            }

            document.getElementById("cerrar").addEventListener("click", () => {
                cerrar();
            });
//Carga los datos del usuario al inicio de la página
let savedPerf = localStorage.getItem(`${usuario}`);
            if (savedPerf !== null) {
                perfil = JSON.parse(localStorage.getItem(`${usuario}`))
                console.log(perfil[0].name)

                document.getElementById('name1').value = perfil[0].name
document.getElementById('surname1').value =perfil[0].surname
document.getElementById('email1').value = perfil[0].email
document.getElementById('name2').value = perfil[0].name2
document.getElementById('surname2').value = perfil[0].surname2
document.getElementById('tel1').value = perfil[0].tel


   

            } else {
                console.log('no existe perfil guardado')
            }

})