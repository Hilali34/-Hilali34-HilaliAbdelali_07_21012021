import React, {useState} from 'react';
import _ from "lodash";
import {deleteComment, editComment} from "../actions/comment.action";
import {useDispatch} from "react-redux";

const CommentCard = ({ comment}) => {
    const dispatch = useDispatch();
    const userNameIsEmpty = _.isEmpty(comment.User);
    const token = window.localStorage.getItem("userToken").replace(/"/g,'')
    const commentId = comment.id;
    const userId = window.localStorage.getItem("userId");
    const isAuthor = comment.UserId == userId;
    const [content, setContent] = useState("");
    const [editToggle, setEditToggle] = useState(false);

    const NewFormatCreateDate = (CreatedAt) => {
        const dateArray =Array.from(CreatedAt);
        dateArray.splice(10, 1);
        dateArray.splice(15, 8);
        const date = dateArray.slice(0, 10);
        const hour = dateArray.slice(10);
        const dateJoin = date.join("");
        const dateSplit = dateJoin.split("-", 3);
        const dateReverse = dateSplit.reverse();
        return "Posté le : "+ dateReverse.join(".") + " à " + hour.join("");
    }


    const handleEditComment = async (e) => {
        e.preventDefault()

        console.log(content)
        const data = {
            content
        };

        dispatch(editComment(data,commentId,token))
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
                        <form onSubmit={e =>handleEditComment(e)}>

                            <div className="form-group">
                                <label htmlFor="floatingInput"> </label>
                                <label className="sr-only" htmlFor="message">Publication</label>
                                <textarea className="form-control" id="message" rows="3"
                                          defaultValue={comment.content}
                                          required onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="me-3 btn btn-primary">Valider</button>
                                <button type="button" className="me-3 btn btn-primary" onClick={() => setEditToggle(!editToggle)}>annuler</button>
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
                    <p className="card-text"> {NewFormatCreateDate(comment.createdAt)} </p>
                </div>

                {isAuthor ? (

                    <div className="card-footer">

                        <button type="button" className=" me-3 btn btn-primary"

                                onClick={() => dispatch(deleteComment(commentId,token))}>

                            Supprimer</button>

                        <button type="button" className="me-3 btn btn-primary"

                                onClick={() => setEditToggle(!editToggle)}

                        >Editer</button>

                    </div>

                ) : null}

            </div>

        </div>

    );

};

export default CommentCard;

