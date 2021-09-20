import jwtDecode from "jwt-decode";
import {successLogOut} from "./notification";


export function hasAuthenticated(){
    const token = (window.localStorage.getItem("userToken"));
    const resultTokenValidation = token ? tokenIsValid(token) : false;

    if (resultTokenValidation === false){
        window.localStorage.removeItem("userToken");
    }
    return resultTokenValidation ;
}

export function logout(){
    window.localStorage.removeItem("userToken");
    window.localStorage.removeItem("userId");
    successLogOut.success("Deconnexion reussi ! A Bientôt...");
}


function tokenIsValid(token){
    const {exp:expiration} = jwtDecode(token);
    if(expiration * 1000 > new Date().getTime()){
        return true;
    }
    return false;
}
