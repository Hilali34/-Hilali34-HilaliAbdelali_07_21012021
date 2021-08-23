import React from 'react';
import NavBar from "../components/NavBar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";

const Home = () => {
    return (
        <div>
           <NavBar/>
            <PostCreation/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
};

export default Home;
