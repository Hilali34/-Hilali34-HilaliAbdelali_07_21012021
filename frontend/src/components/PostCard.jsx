import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PostCard = (props) => {
    const {post} = props;

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
                                <div className="h5 m-0">{post.User.username}</div>
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
                    <a href="#" className="card-link"><FontAwesomeIcon icon="heart" /> Like</a>
                    <a href="#" className="card-link"><FontAwesomeIcon icon="comment" /> Comment</a>
                </div>
            </div>
        </div>

    );
};

export default PostCard;
