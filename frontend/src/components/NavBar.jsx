import React, {Component, useContext} from 'react';
import logo from "../logo.svg";
import {NavLink} from "react-router-dom";
import Auth from "../contexts/Auth";
import {logout} from "../services/AuthApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";


const NavBar = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(Auth);

    const user = useSelector((state) => state.profileReducer)

    console.log(user);

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    }

    return (


        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <NavLink exact to="/"
                         className="d-flex align-items-center col-md-3 P-2 mb-md-0 text-dark text-decoration-none">
                    <img className="m-2" src={logo} alt="logo"/>
                </NavLink>

                <ul className="nav col-12 col-md-auto p-2 justify-content-center mb-md-0">
                    <li><NavLink exact to="/" className="nav-link px-2 link-secondary">Posts</NavLink></li>
                    <li><NavLink exact to="/profile" className="nav-link px-2 link-dark">Mon Compte</NavLink></li>
                    <li><NavLink exact to="/profile" className="nav-link px-2 link-dark"><FontAwesomeIcon
                        icon="user-circle" size="lg"/> {user.username}</NavLink></li>
                    <li><NavLink exact to="/profile" className="nav-link px-2 link-dark">
                        <button className=" btn btn-sm btn-primary" type="submit" onClick={handleLogout}>Déconnexion
                        </button>
                    </NavLink></li>
                </ul>

            </header>
        </div>
    );
};

export default NavBar;

