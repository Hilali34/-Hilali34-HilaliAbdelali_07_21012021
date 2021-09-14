import React from 'react';
import Comments from "../components/Comments";
import NavBar from "../components/NavBar";
import PostToComment from "../components/PostToComment";


const Comment = () => {


    return (
        <div>
            <NavBar/>
            <PostToComment/>
            <Comments/>
        </div>
    );
};

export default Comment;