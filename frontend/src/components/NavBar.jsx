import React, {Component} from 'react';

import logo from "../logo.svg";

class NavBar extends Component {
    render() {
        return (
            <div className="container">
                <header
                    className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="/"
                       className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <img src={logo} alt="logo" />
                    </a>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" className="nav-link px-2 link-secondary">Acceuil</a></li>
                        <li><a href="#" className="nav-link px-2 link-dark">Features</a></li>
                        <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
                        <li><a href="#" className="nav-link px-2 link-dark">FAQs</a></li>
                        <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
                    </ul>

                    <div className="col-md-3 text-end">
                        <button type="button" className="btn btn-outline-primary me-2">Se Connecter</button>
                        <button type="button" className="btn btn-primary">inscription</button>
                    </div>
                </header>
            </div>
        );
    }
}


export default NavBar;
