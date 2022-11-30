import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
const googleButton = document.getElementById('googleb')
import { auth } from "./firebase.js"

//--------------------------IGUAL QUE LOGIN.JS--------------------------
  // Expresión regular para email
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 

  let usuario = document.getElementById('nombre').value;
  let clave = document.getElementById('clave').value;
//Validación de ingreso
function login() {
   
    
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
    
    
    
    
    //--------------------------------------------------------------------------------------
   



   
    
    
    










googleButton.addEventListener('click', async ()=>{

const provider = new GoogleAuthProvider()

try {
    const credentials = await signInWithPopup(auth, provider)
    console.log(credentials)

    // const modal = boostrap.Modal.getInstance.querySelector('#singInModal')
    // modal.hide()
    usuario = credentials.user.email
    clave = credentials.user.uid
    console.log(credentials.user.email)
    console.log(credentials.user.uid)
    login()


} catch (error) {
    console.log(error)
}

})








