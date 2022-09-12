document.addEventListener("DOMContentLoaded", function () {
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

  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
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
});