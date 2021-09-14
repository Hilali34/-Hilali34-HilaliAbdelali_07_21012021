import React, {useEffect, useState} from 'react';
import axios from "axios";
import PostCard from "./PostCard";


const Posts = () => {
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
    return (
        <div>
            <ul>

                {data.map ((post) => (

                    <PostCard post={post} key={post.createdAt} />

                ))}

            </ul>
        </div>
    );
};

export default Posts;