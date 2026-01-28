//Traemos lo de los datos ingresados por el usuario
import {RuserName, RuserPass, RuserRol,BtnReg} from './elements';
//Array donde iran los usuarios de momento mientras aprendo jsonserver
users = [];
const rol = RuserRol.value; //Rol afuera para que si sea captado por el scope
//Le damos el evento que capture y envie todo.
export function Register(){
    BtnReg.addEventListener('click', (e) =>{
        e.preventDefault()
        createUser();
    })
}
export function createUser(){
    const UserName = RuserName.value;
    const UserPass = RuserPass.value;
    //Validamos que no esten vacios.
    if(UserName.trim() === "" || UserPass.trim() === ""){
            alert("Complete all datas please.")
    } 
    else { alert("testeo de validaciones completado")};
    intArray();
}
export function intArray(){
    users.push({
        "name": UserName,
        "password": UserPass,
        "role": rol
    })
}