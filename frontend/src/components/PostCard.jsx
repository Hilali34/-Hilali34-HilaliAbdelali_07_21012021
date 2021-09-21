import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavLink} from "react-router-dom";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {editPost, deletePost, likePost, dislikePost, getPosts} from "../actions/post.action";
import {newFormatDate} from "../utils/formatDate";

const PostCard = ({post}) => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editToggle, setEditToggle] = useState(false);

    const userNameIsEmpty = _.isEmpty(post.User);


    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("userToken").replace(/"/g, '')
    const postId = post.id;


    const dispatch = useDispatch();



    const isAuthor = post.UserId == userId;



    const handleEditPost = (e) => {
        e.preventDefault()
        console.log(title)
        console.log(content)
        const data = {
            title,
            content
        };

        dispatch(editPost(data, postId, token))
        setEditToggle(false);
        window.location = ("/")
    };

    const handleLikePost = async (e) => {
        e.preventDefault()

        console.log(post)

        await dispatch(likePost(postId, token));
        setIsLiked(true);
        if (isDisliked) {
            setIsDisliked(false)
        }

    };

    const handleDislikePost = async (e) => {
        e.preventDefault()


        await dispatch(dislikePost(postId, token));
        setIsDisliked(true);
        if (isLiked) {
            setIsLiked(false)
        }

    };

    const [isLiked, setIsLiked] = useState();
    const [isDisliked, setIsDisliked] = useState();

    return (
        <div className="container col-md-8 mb-4">
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="ml-2">
                                <div className="h5 m-0">Posté par : {!userNameIsEmpty && post.User.username}</div>
                            </div>
                        </div>

                    </div>

                </div>
                {editToggle ?

                    (
                        <form onSubmit={e => handleEditPost(e)}>

                            <div className="form-group">
                                <label htmlFor="floatingInput"> </label>
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder={post.title}
                                       required onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="floatingInput"> </label>
                                <label className="sr-only" htmlFor="message">Publication</label>
                                <textarea className="form-control" id="message" rows="3"
                                          placeholder={post.content}
                                          required onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="card-footer">

                                <button type="button" className="m-3 btn-sm btn-primary"
                                        onClick={() => setEditToggle(!editToggle)}>
                                    annuler
                                </button>

                                <button type="submit" className="m-3 btn-sm btn-primary">Valider</button>

                            </div>
                        </form>

                    ) :

                    (
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text"> {post.content} </p>
                        </div>
                    )

                }
                <div className="card-footer">
                    <p className="card-text"> {newFormatDate(post.createdAt)} </p>
                </div>
                <div className="card-footer">
                    <span className="like-counter text-success">{post.likes}</span>
                    <a className="text-primary mx-3"
                       onClick={handleLikePost}><FontAwesomeIcon icon="thumbs-up"/></a>
                    <span className="dislike-counter text-danger">{post.dislikes}</span>
                    <a className="text-primary mx-3"
                       onClick={handleDislikePost}><FontAwesomeIcon icon="thumbs-down"/></a>

                    <NavLink to={`/commentaire/${post.id}`} className={"card-link"}><FontAwesomeIcon
                        icon="comment"/> Commentaires</NavLink>

                </div>

                {isAuthor ? (

                    <div className="card-footer">

                        <button type="button" className=" me-3 btn btn-primary"

                                onClick={() => dispatch(deletePost(postId, token))}>

                            Supprimer
                        </button>

                        <button type="button" className="me-3 btn btn-primary"

                                onClick={() => setEditToggle(!editToggle)}

                        >Editer
                        </button>

                    </div>

                ) : null}

            </div>

        </div>

    );

};

export default PostCard;
