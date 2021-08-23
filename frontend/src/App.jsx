import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/NavBar';
import SingIn from "./pages/SingIn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/connexion" exact component={SingIn}/>
                <Route path="/inscription" exact component={SignUp}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
