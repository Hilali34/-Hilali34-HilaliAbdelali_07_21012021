import React, {useContext, useEffect, useState} from 'react';
import logo from "../logo.svg";
import { NavLink} from "react-router-dom";
import axios from 'axios';
import Auth from "../contexts/Auth";

const SignUp = ({history}) => {

    const {isAuthenticated} = useContext(Auth);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignUp = async (e) => {
        e.preventDefault()
        const errorMessage = document.querySelector(".error-message");

        await axios({
            method: "POST",
            url:"http://localhost:4200/groupomania/user/signup",
            data: {
                username,
                email,
                password,
            },

        },[])
            .then((res)=>{
            if (res.data.error){
                console.log(res);
                errorMessage.textContent = res.data.error;

            }else{
                window.alert("Vous etes desormais incrit, veuillez vous connecter !");
                //window.location = "/connexion";
            }

        })
            .catch((error)=>{
                console.log(error);
            })

    };

    useEffect(() => {
        if (isAuthenticated) {
            history.replace("/");
        }
    }, [history, isAuthenticated]);


    return (
        <div className="container col-md-8" >
            <main className="form-signin ">
                <form className="p-4" onSubmit={handleSignUp}>
                    <div className="col-md-auto text-end">
                        <NavLink exact to="/"
                                 className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                            <img src={logo} alt="logo" />
                        </NavLink>
                        <NavLink exact to="/connexion" type="button" className="btn btn-primary me-2"> Se Connecter </NavLink>
                    </div>

                    <h1 className="h3 mb-3 fw-normal">Merci de Créer votre compte</h1>
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control" id="username"
                               placeholder="Nom d'utilisateur"  value={username} required onChange={e => setUsername(e.target.value)}/>
                        <label htmlFor="username">Nom d'utilisateur</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com" value={email}  required onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Adresse mail</label>

                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password" value={password}  required onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Mot de passe</label>
                    </div>
                    <p className="error-message text-danger"></p>
                    <button className="btn btn-lg btn-primary" type="submit">Inscription</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </main>
        </div>
    );
};

export default SignUp;
