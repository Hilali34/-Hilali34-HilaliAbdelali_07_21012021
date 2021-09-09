import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
library.add(fas, faCheckSquare, faCoffee)
import SingIn from "./pages/SingIn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/connexion" exact component={SingIn}/>
                <Route path="/inscription" exact component={SignUp}/>
                <Route path="/profile" exact component={Profile}/>

                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
