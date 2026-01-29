//Aqui importamos todo.
import { Register } from "./register.js";
import{changeL,changeR,log} from './login.js'
//Exportamos lo cargado de JSON
export function getUsers() {
    //console.log("Usuarios cargados correctamente")
  return JSON.parse(localStorage.getItem("usuarios")) || {};
}
//LLamamos a las funciones creadas en otras lineas de codigo.
Register();
changeL();
changeR();
log();
getUsers()