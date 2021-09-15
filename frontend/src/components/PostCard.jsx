import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink} from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal';


Modal.setAppElement("#root");


const PostCard = (props) => {
    const {post} = props;

    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("userToken").replace(/"/g,'')
    const postId = post.id;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);


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


    const handleDeletePost = async (e) => {
        e.preventDefault()

        await axios({
            method: "DELETE",
            url:`http://localhost:4200/groupomania/post/${postId}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params:{
                id: postId
            }

        },[])
            .then((res)=>{
                    window.alert("Le Post a été supprimé avec succès !");

            })
            .catch((error)=>{
                console.log(error);
            })

    };


    const handlePostUpdate = async (e) => {
        e.preventDefault()

        await axios({
            method: "PUT",
            url:`http://localhost:4200/groupomania/post/${postId}`,
            data: {
                title,
                content,
            },
            headers: {
                'authorization': `Bearer ${token}`
            },
            params:{
                id: postId
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
                    <span>0</span>
                    <a  className="text-secondary mx-3" ><FontAwesomeIcon icon="thumbs-up" /></a>
                    <span>0</span>
                    <a  className="text-secondary mx-3" ><FontAwesomeIcon icon="thumbs-down" /></a>

                    <NavLink to={`/commentaire/${post.id}`} className={"card-link"}><FontAwesomeIcon icon="comment" /> Commentaire(s)</NavLink>

                </div>

                { isAuthor ?(

                    <div className="card-footer">
                        <button type="button" className=" me-3 btn btn-primary" onClick={handleDeletePost} >Supprimer</button>
                        <button type="button" className="me-3 btn btn-primary" onClick={ () => { setModalIsOpen(true)}}>Editer</button>
                    </div>

                    ):null}

            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={ ()=> setModalIsOpen(false)} >

                <div className="card gedf-card  border secondary">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active show" id="posts-tab" data-toggle="tab" href="#posts"
                                   role="tab" aria-controls="posts" aria-selected="true"> Votre Article</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">

                        <form onSubmit={handlePostUpdate}>

                            <div className="form-group">
                                <label htmlFor="floatingInput"> </label>
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder={post.title}
                                       value={title}  required onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="floatingInput"> </label>
                                <label className="sr-only" htmlFor="message">Publication</label>
                                <textarea className="form-control" id="message" rows="3"
                                          placeholder={post.content}
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
                </div>
            </Modal>
        </div>

    );
};

export default PostCard;
