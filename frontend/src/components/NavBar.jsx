import React, {Component} from 'react';
import logo from "../logo.svg";
import { NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <NavLink exact to="/"
                   className="d-flex align-items-center col-md-3 P-2 mb-md-0 text-dark text-decoration-none">
                    <img className="m-2" src={logo} alt="logo" />
                </NavLink>

                <ul className="nav col-12 col-md-auto p-2 justify-content-center mb-md-0">
                    <li><NavLink exact to="/" className="nav-link px-2 link-secondary">Accueil</NavLink></li>
                    <li><NavLink exact to="/" className="nav-link px-2 link-dark">Features</NavLink></li>
                    <li><NavLink exact to="/" className="nav-link px-2 link-dark">Pricing</NavLink></li>
                    <li><NavLink exact to="/"  className="nav-link px-2 link-dark">FAQs</NavLink></li>
                    <li><NavLink exact to="/" className="nav-link px-2 link-dark">About</NavLink></li>
                </ul>

                <div className="col-md-auto text-end">
                   <NavLink exact to="/connexion" type="button" className="btn btn-outline-primary me-2"> Se Connecter </NavLink>
                   <NavLink exact to="/inscription" type="button" className="btn btn-primary">S'inscrire</NavLink>
                </div>
            </header>
        </div>
    );
};

export default NavBar;

