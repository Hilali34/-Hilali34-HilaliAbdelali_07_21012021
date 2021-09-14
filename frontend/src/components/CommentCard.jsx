import React from 'react';

const CommentCard = (props) => {
    const {aComment} = props;

    console.log(aComment)

    const userId = window.localStorage.getItem("userId");

    const isAuthor = aComment.UserId == userId;

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



    return (
        <div>
            <div className="container col-md-8 mb-4" >
                <div className="card gedf-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="ml-2">
                                    <div className="h5 m-0">Commenté par: {aComment.User.username}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="card-body">
                        <p className="card-text">{aComment.content}</p>
                    </div>
                    <div className="card-footer">
                        <p className="card-text">{NewFormatCreateDate(aComment.createdAt)}</p>
                    </div>

                    { isAuthor ?(

                        <div className="card-footer">
                            <button type="submit" className=" me-3 btn btn-primary">Supprimer</button>
                            <button type="submit" className="me-3 btn btn-primary">Editer</button>
                        </div>

                    ):null}


                </div>
            </div>


        </div>

    );
};

export default CommentCard;