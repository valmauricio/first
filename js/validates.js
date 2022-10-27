// const radio1 = document.getElementById('r1');
// const radio2 = document.getElementById('r2');
// const streetField = document.querySelector("[name=calle]");
// const numbField = document.querySelector("[name=numero]");
// const cornerField = document.querySelector("[name=esquina]");


// streetField.addEventListener('blur', function (e) {
//     const field = e.target;
//     const fieldValue = e.target.value;
//     if (fieldValue.trim().length === 0) {
//         // field.parentElement.insertAdjacentHTML
//         field.classList.add("invalid")
//         field.nextElementSibling.classList.add("error")
//         field.nextElementSibling.innerText = "Ingresa una calle"
//     } else {
//         field.classList.remove("invalid")
//         field.nextElementSibling.classList.remove("error")
//         field.nextElementSibling.innerText = "" 
//     }
// })


// cornerField.addEventListener('blur', function (e) {
//     const field = e.target;
//     const fieldValue = e.target.value;
//     if (fieldValue.trim().length === 0) {
//         // field.parentElement.insertAdjacentHTML
//         field.classList.add("invalid")
//         field.nextElementSibling.classList.add("error")
//         field.nextElementSibling.innerText = "Ingresa una esquina"
//     } else {
//         field.classList.remove("invalid")
//         field.nextElementSibling.classList.remove("error")
//         field.nextElementSibling.innerText = "" 
//     }
// })


// numbField.addEventListener('blur', function (e) {
//     const field = e.target;
//     const fieldValue = e.target.value;
//     if (fieldValue.trim().length === 0) {
//         // field.parentElement.insertAdjacentHTML
//         field.classList.add("invalid")
//         field.nextElementSibling.classList.add("error")
//         field.nextElementSibling.innerText = "Ingresa un número"
//     } else {
//         field.classList.remove("invalid")
//         field.nextElementSibling.classList.remove("error")
//         field.nextElementSibling.innerText = "" 
//     }
// })

// Programar un evento KEYUP para que cuando se escriba los datos correctos se vaya el cartel de error 
// sin tener que hacer el blur
// ver las clasese de boostrap a ver si alguna ya me pinta de rojo sin usar mi clase

// ;

// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
// (function () {
//     'use strict'
  
//     // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
//     var forms = document.querySelectorAll('.needs-validation')
  
//     // Bucle sobre ellos y evitar el envío
//     Array.prototype.slice.call(forms)
//       .forEach(function (form) {
//         form.addEventListener('submit', function (event) {
//           if (!form.checkValidity()) {
//             event.preventDefault()
//             event.stopPropagation()
//           }
  
//           form.classList.add('was-validated')
          


//   if (!radio1.checked && !radio2.checked) {
//     document.getElementById('but').innerHTML = 'No ha seleccionado'
    
    
   
//   }
  


          
//         }, false)
//       })
//   })()
  

  