import React, {useState} from 'react';
import _ from "lodash";
import {deleteComment, editComment} from "../actions/comment.action";
import {useDispatch} from "react-redux";
import {newFormatDate} from "../utils/formatDate";

const CommentCard = ({comment}) => {

    const dispatch = useDispatch();
    const userNameIsEmpty = _.isEmpty(comment.User);
    const token = window.localStorage.getItem("userToken").replace(/"/g, '')
    const commentId = comment.id;
    const userId = window.localStorage.getItem("userId");
    const isAuthor = comment.UserId == userId;
    const [content, setContent] = useState("");
    const [editToggle, setEditToggle] = useState(false);


    const handleEditComment = async (e) => {
        e.preventDefault()

        console.log(content)
        const data = {
            content
        };

        dispatch(editComment(data, commentId, token))
        setEditToggle(false);

    };


    return (
        <div className="container col-md-8 mb-4">
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="ml-2">
                                <div className="h5 m-0">Posté par : {!userNameIsEmpty && comment.User.username}</div>
                            </div>
                        </div>

                    </div>

                </div>
                {editToggle ?

                    (
                        <form onSubmit={e => handleEditComment(e)}>

                            <div className="form-group">
                                <label htmlFor="floatingInput"> </label>
                                <label className="sr-only" htmlFor="message">Publication</label>
                                <textarea className="form-control" id="message" rows="3"
                                          placeholder={comment.content}
                                          required onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="m-3 btn-sm btn-primary">Valider</button>
                                <button type="button" className="m-3 btn-sm btn-primary"
                                        onClick={() => setEditToggle(!editToggle)}>annuler
                                </button>
                            </div>
                        </form>

                    ) :

                    (
                        <div className="card-body">
                            <p className="card-text"> {comment.content} </p>
                        </div>
                    )

                }

                <div className="card-footer">
                    <p className="card-text"> {newFormatDate(comment.createdAt)} </p>
                </div>

                {isAuthor ? (

                    <div className="card-footer">

                        <button type="button" className=" me-3 btn btn-primary"

                                onClick={() => dispatch(deleteComment(commentId, token))}>

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

export default CommentCard;

