//Traemos lo de los datos ingresados por el usuario 
import {RuserName, RuserPass, RuserRol, BtnReg} from './elements.js'; 

//Array donde iran los usuarios de momento mientras aprendo jsonserver 
export const users = []; 

//Le damos el evento que capture y envie todo. 
export function Register() {
    BtnReg.addEventListener('click', (e) => {
        e.preventDefault();

        //Capturamos los valores actuales del usuario
        let UserName = RuserName.value;
        let UserPass = RuserPass.value;
        const rol = RuserRol.value; //Rol dentro para que sea captado por el scope

        //Validamos que no esten vacios.
        if(UserName.trim() === "" || UserPass.trim() === ""){
            alert("Complete all datas please.");
        } else {
            alert("testeo de validaciones completado");
            intArray(UserName, UserPass, rol);
        }
    });
}

//Creamos la funcion para ingresar el usuario al array
export function intArray(name, pass, role){
    users.push({
        "name": name,
        "password": pass,
        "role": role
    });
    console.log(users);
    LS(users);
}
//Lo metemos dentro del localStorage para poder inicializarlo una vez creado
function LS(users){
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Se subio adecuadamente a LS")
};