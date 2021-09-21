import React from 'react';
import PostCard from "./PostCard";
import {useSelector} from "react-redux";
import _ from "lodash";


const Posts = () => {

    const posts = useSelector((state) => state.postReducer)
    console.log(posts)

// verifier la disponibilté des données avant de mapper
    const postsIsEmpty = _.isEmpty(posts);

    return (
        <div>
            <ul>

                {!postsIsEmpty && posts.map((post) => (

                    <PostCard post={post} key={post.createdAt}/>

                ))}

            </ul>
        </div>
    );

};

export default Posts;