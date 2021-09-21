import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import CommentCreation from "./CommentCreation";
import {newFormatDate} from "../utils/formatDate";

const Comment = () => {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(async () => {

        setLoading(true);
        const postId = document.URL.split("commentaire/")[1];
        const token = window.localStorage.getItem("userToken").replace(/"/g, '')

        await axios
            .get((`http://localhost:4200/groupomania/post/${postId}`), {
                headers: {
                    'authorization': `Bearer ${token}`
                },
                params: {
                    id: postId
                }

            })
            .then((res) => {
                setData(res.data.post)
                setUsername(res.data.post.User.username)
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);


    if (loading) {
        return <p>Data is loading...</p>;
    }


    return (

        <div>
            <div className="container col-md-8 mb-4">
                <div className="card gedf-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="ml-2">
                                    <div className="h5 m-0"> Posté par : {username} </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.content}</p>
                    </div>
                    <div className="card-footer">
                        <p className="card-text">{newFormatDate(data.createdAt)}</p>
                    </div>

                    <div className="card-footer">
                        <a className="card-link"><FontAwesomeIcon icon="heart"/> Like</a>
                    </div>
                    <CommentCreation/>
                </div>
            </div>
        </div>
    );
};

export default Comment;