import { lUserName, lUserPass, lUserRole, BtnChangeFormR, BtnChangeFormL, Lform, Rform, BtnLog } from './elements.js';
import { users } from './register.js';
import { getUsers } from './main.js';
//Traemos los datos de LS y los metemos a users para evitar fallos de conectividad por array vacio.
getUsers();
//Creamos evento para cambio de login ALKSLDKA
export function changeR() {
    //Cambiamos el fomulario
    BtnChangeFormR.addEventListener('click', () => {
        Lform.className = "d-flex justify-content-center align-items-center vh-100";
        Rform.className = "d-none justify-content-center align-items-center vh-100";
    })
}
export function changeL() {
    //Cambiamos el fomulario
    BtnChangeFormL.addEventListener('click', () => {
        Rform.className = "d-flex justify-content-center align-items-center vh-100";
        Lform.className = "d-none justify-content-center align-items-center vh-100";
    })
}
//Tomamos y validamos los datos del LogIn
export function log() {
    BtnLog.addEventListener('click', () => {
        let userName = lUserName.value;
        let userPass = lUserPass.value;
        let userRole = lUserRole.value;
        //Mismas validaciones 
        if (userName.trim() === "" || userPass.trim() === "") {
            alert("Complete all datas please.");
        } else if (users.length === 0) {
            alert("No hay usuarios registrados");
            return;
        }
        // buscar usuario
        const uservalid = users.find(
            u => u.name === lUserName && u.password === lUserPass
        );

        if (usuarioValido) {
            // guardar sesión
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("currentUser", uservalid.name);

            // redirigir
            window.location.href = "index.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}
