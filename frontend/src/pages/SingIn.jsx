import React from 'react';
import logo from "../logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink} from "react-router-dom";

const SingIn = () => {
    return (
        <div className="container col-md-8">
            <main className="form-signin ">
                <form className="p-4">
                    <NavLink exact to="/"
                             className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <img src={logo} alt="logo" />
                    </NavLink>
                        <h1 className="h3 mb-3 fw-normal">Merci de saisir vos identifiants</h1>

                        <div className="form-floating mb-4">
                            <input type="email" className="form-control" id="floatingInput"
                                   placeholder="name@example.com"/>
                                <label htmlFor="floatingInput">Adresse mail</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="password" className="form-control" id="floatingPassword"
                                   placeholder="Password"/>
                                <label htmlFor="floatingPassword">Mot de passe</label>
                        </div>

                        <div className="checkbox mb-4">
                            <label>
                                <input type="checkbox" value="remember-me"/> Se souvenir de moi
                            </label>
                        </div>
                        <button className=" btn btn-lg btn-primary" type="submit">Connexion</button>
                        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </main>
        </div>
    );
};

export default SingIn;
