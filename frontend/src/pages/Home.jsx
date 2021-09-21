import React from 'react';
import NavBar from "../components/NavBar";
import PostCreation from "../components/PostCreation";
import Posts from "../components/Posts";


const Home = () => {

    return (
        <div>
            <NavBar/>
            <PostCreation/>
            <Posts/>
        </div>
    );
};

export default Home;
