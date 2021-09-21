import React from 'react';
import {useState} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faCoffee, faHeart} from '@fortawesome/free-solid-svg-icons'

library.add(fas, faCheckSquare, faCoffee)
import SingIn from "./pages/SingIn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Comment from "./pages/Comment";
import Profile from "./pages/Profile";
import {hasAuthenticated} from "./services/AuthApi";
import Auth from "./contexts/Auth";
import AuthenticatedRoute from "./components/AuthenticatedRoute";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

    return (
        <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <BrowserRouter>
                <Switch>
                    <AuthenticatedRoute exact path="/" component={Home}/>
                    <Route exact path="/connexion" component={SingIn}/>
                    <Route exact path="/inscription" component={SignUp}/>
                    <AuthenticatedRoute exact path={"/commentaire/:postId"} component={Comment}/>
                    <AuthenticatedRoute exact path="/profile" component={Profile}/>

                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Auth.Provider>
    );
};

export default App;
