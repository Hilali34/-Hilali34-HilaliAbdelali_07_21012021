import React, {useEffect, useState} from 'react';
import axios from "axios";
import PostCard from "./PostCard";
import {useSelector} from "react-redux";
import _ from "lodash";


const Posts = () => {

    const posts = useSelector( (state) => state.postReducer )
    console.log(posts)

// verifier la disponibilté des données avant de mapper
    const postsIsEmpty = _.isEmpty(posts);



/*
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:4200/groupomania/post/")
            .then((res) => setData(res.data.post)
            )
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });

    },[] );

    if (loading) {
        return <p>Data is loading...</p>;
    }

    if ( error || !Array.isArray(data)) {
        console.log(data)
        return <p>There was an error loading your data!</p>;
    }
    console.log(data);

 */


    return (
        <div>
            <ul>

                 {!postsIsEmpty && posts.map ((post) => (

                    <PostCard post={post} key={post.createdAt}/>

                ))}

            </ul>
        </div>
    );

};

export default Posts;