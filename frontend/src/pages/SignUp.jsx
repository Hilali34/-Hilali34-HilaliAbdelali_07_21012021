import React from 'react';
import logo from "../logo.svg";
import { NavLink} from "react-router-dom";

const SignUp = () => {
    return (
        <div >
            <main className="form-signin ">
                <form className="p-4">

                    <NavLink exact to="/"
                       className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <img src={logo} alt="logo" />
                    </NavLink>
                    <h1 className="h3 mb-3 fw-normal">Merci de Creer votre compte</h1>

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
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"/>
                        <label htmlFor="floatingPassword">Confirmer votre mot de passe</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Inscription</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </main>
        </div>
    );
};

export default SignUp;
