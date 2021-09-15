import React, {useState} from 'react';
import axios from "axios";
import Modal from "react-modal";

const CommentCard = (props) => {
    const {aComment} = props;

    console.log(aComment)
    const token = window.localStorage.getItem("userToken").replace(/"/g,'')
    const commentId = aComment.id;
    const userId = window.localStorage.getItem("userId");
    const isAuthor = aComment.UserId == userId;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

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



    const handleDeleteComment = async (e) => {
        e.preventDefault()

        await axios({
            method: "DELETE",
            url:`http://localhost:4200/groupomania/comment/${commentId}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params:{
                commentId: commentId
            }

        },[])
            .then((res)=>{
                window.alert("Le Post a été supprimé avec succès !");

            })
            .catch((error)=>{
                console.log(error);
            })

    };

    const handleCommentUpdate = async (e) => {
        e.preventDefault()

        await axios({
            method: "PUT",
            url:`http://localhost:4200/groupomania/comment/${commentId}`,
            data: {
                content,
            },
            headers: {
                'authorization': `Bearer ${token}`
            },
            params:{
                id: commentId
            }

        },[])
            .then((res)=>{
                window.alert("Le post a été modifé avec succès !");
                window.location = "/";

            })
            .catch((error)=>{
                console.log(error);
            })

    };



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
                            <button type="button" className=" me-3 btn btn-primary" onClick={handleDeleteComment} >Supprimer</button>

                            <button type="submit" className="me-3 btn btn-primary" onClick={ () => { setModalIsOpen(true)}}>Editer</button>
                        </div>

                    ):null}

                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={ ()=> setModalIsOpen(false)} >
                    <div>
                        <form onSubmit={handleCommentUpdate}>

                            <div className="form-group">
                                <label className="sr-only" htmlFor="message">Commentaire</label>
                                <textarea className="form-control" id="message" rows="3"
                                           placeholder={aComment.content}
                                          value={content}  required onChange={e => setContent(e.target.value)}
                                />
                            </div>
                            <div className="card-footer">
                                <button type="button" className=" me-3 btn btn-primary"
                                        onClick={ () => {
                                            setModalIsOpen(false)
                                        }}
                                >Annuler</button>
                                <button type="submit" className="me-3 btn btn-primary" >Valider</button>
                            </div>
                        </form>

                    </div>
                </Modal>

            </div>


        </div>

    );
};

export default CommentCard;