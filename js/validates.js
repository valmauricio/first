const streetField = document.querySelector("[name=calle]");
const numbField = document.querySelector("[name=numero]");
const cornerField = document.querySelector("[name=esquina]");


streetField.addEventListener('blur', function (e) {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length === 0) {
        // field.parentElement.insertAdjacentHTML
        field.classList.add("invalid")
        field.nextElementSibling.classList.add("error")
        field.nextElementSibling.innerText = "Ingresa una calle"
    } else {
        field.classList.remove("invalid")
        field.nextElementSibling.classList.remove("error")
        field.nextElementSibling.innerText = "" 
    }
})


cornerField.addEventListener('blur', function (e) {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length === 0) {
        // field.parentElement.insertAdjacentHTML
        field.classList.add("invalid")
        field.nextElementSibling.classList.add("error")
        field.nextElementSibling.innerText = "Ingresa una esquina"
    } else {
        field.classList.remove("invalid")
        field.nextElementSibling.classList.remove("error")
        field.nextElementSibling.innerText = "" 
    }
})


numbField.addEventListener('blur', function (e) {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length === 0) {
        // field.parentElement.insertAdjacentHTML
        field.classList.add("invalid")
        field.nextElementSibling.classList.add("error")
        field.nextElementSibling.innerText = "Ingresa un número"
    } else {
        field.classList.remove("invalid")
        field.nextElementSibling.classList.remove("error")
        field.nextElementSibling.innerText = "" 
    }
})

// Programar un evento KEYUP para que cuando se escriba los datos correctos se vaya el cartel de error 
// sin tener que hacer el blur
// ver las clasese de boostrap a ver si alguna ya me pinta de rojo sin usar mi clase

// ;