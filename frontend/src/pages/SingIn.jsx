import React, {useContext, useEffect, useState} from 'react';
import logo from "../logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";
import axios from "axios";
import Auth from "../contexts/Auth";
import {errorSignIn, successSignIn} from "../services/notification";


const SingIn = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(Auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");





    const handleSignIn = async(e) => {
        e.preventDefault()

        await axios({
            method: "POST",
            url: "http://localhost:4200/groupomania/user/login",
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data.error)
                    errorSignIn.error(res.data.error);

                } else {

                    localStorage.clear();
                    window.localStorage.setItem("userToken", JSON.stringify(res.data.token));
                    window.localStorage.setItem("userId", JSON.stringify(res.data.userId));
                    setIsAuthenticated(true);
                    window.location = ("/")


                }


            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {

        if (isAuthenticated) {

            history.replace("/");
        }
    }, [history, isAuthenticated]);

    return (
        <div className="container col-md-8">
            <main className="form-signin ">
                <form className="p-4" onSubmit={handleSignIn}>
                    <div className="col-md-auto text-end">
                        <NavLink exact to="/"
                                 className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                            <img src={logo} alt="logo"/>
                        </NavLink>
                        <NavLink exact to="/inscription" type="button" className="btn btn-primary">S'inscrire</NavLink>
                    </div>

                    <h1 className="h3 mb-3 fw-normal">Merci de saisir vos identifiants</h1>

                    <div className="form-floating mb-4">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com" value={email} required
                               onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Adresse mail</label>

                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password" value={password} required
                               onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Mot de passe</label>

                    </div>

                    <button className=" btn btn-lg btn-primary" type="submit">Connexion</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </main>
        </div>
    );
};

export default SingIn;
