import React, {useEffect, useState} from 'react';
import axios from "axios";
import CommentCard from "./CommentCard";

const Comments = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const postId = document.URL.split("commentaire/")[1];
    const token = window.localStorage.getItem("userToken").replace(/"/g, '')

    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: `http://localhost:4200/groupomania/comment/all/${postId}`,

            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: postId
            }


        }, [])
            .then((res) => setData(res.data.comment)
            )
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
        // console.log(data);

    }, []);


    if (loading) {
        return <p>Data is loading...</p>;
    }
    if (!data) {
        return <p className="text-center">Ce Post n'a aucun commentaire!</p>;
    }
    if (!Array.isArray(data)) {
        console.log(data)
        console.log(error)
        return <p className="text-center">There was an error loading your data!</p>;
    }

    console.log(data);
    return (
        <div>
            <ul>
                {data.map((aComment) => (
                    <CommentCard aComment={aComment} key={aComment.createdAt}/>

                ))}
            </ul>
        </div>
    );
};

export default Comments;