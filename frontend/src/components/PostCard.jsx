import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink} from "react-router-dom";



const PostCard = (props) => {
    const {post} = props;

    const userId = window.localStorage.getItem("userId");

    const isAuthor = post.UserId == userId;


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


console.log(post)
    return (
        <div className="container col-md-8 mb-4" >
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="ml-2">
                                <div className="h5 m-0">Posté par : {post.User.username}</div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text"> {post.content} </p>
                </div>
                <div className="card-footer">
                    <p className="card-text"> {NewFormatCreateDate(post.createdAt)} </p>
                </div>
                <div className="card-footer">
                    <a  className="card-link"><FontAwesomeIcon icon="heart" /> Like</a>
                    <NavLink to={`/commentaire/${post.id}`} className={"card-link"}><FontAwesomeIcon icon="comment" /> Commentaire</NavLink>

                </div>

                { isAuthor ?(

                    <div className="card-footer">
                        <button type="submit" className=" me-3 btn btn-primary">Supprimer</button>
                        <button type="submit" className="me-3 btn btn-primary">Editer</button>
                    </div>

                    ):null}

            </div>
        </div>

    );
};

export default PostCard;
