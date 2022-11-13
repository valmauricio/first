
  // Expresión regular para email
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 


//Validación de ingreso
function login() {
    let usuario = document.getElementById('nombre').value;
    let clave = document.getElementById('clave').value;
    
    if (usuario !="" && clave !="" && clave.length >= 6 && re.test(String(usuario).toLowerCase()) ) {
    localStorage.setItem('user',usuario);
    location.href = "index.html";
    } else {
      
       Swal.fire({
        icon: 'error',
        text: 'Usuario y Contraseña son requeridos',
        footer: '<div class="container" style="text-align: center;">Debe ingresar un email válido y una contraseña de al menos 6 caracteres</div>'
        
        
      })
    }
    
    }
    
    
    
    
    
    document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('inicio').addEventListener('click',()=>{
        login();
    })
    
    
    })