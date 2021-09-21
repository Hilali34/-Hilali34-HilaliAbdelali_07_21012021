import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editProfile, deleteProfile} from "../actions/profile.action";
import _ from "lodash";
import {logout} from "../services/AuthApi";
import Modal from "react-modal"


const ProfileCard = () => {

    const aProfile = useSelector((state) => state.profileReducer)
    const profileIsEmpty = _.isEmpty(aProfile);

    const dispatch = useDispatch();
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("userToken").replace(/"/g, '')

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");

    //modal

    const [modalIsOpen, setModalIsOpen] = useState(false)
    Modal.setAppElement('#root')

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const handleEditProfile = (e) => {
        e.preventDefault()

        const data = {
            email,
            username,
            bio
        };
        dispatch(editProfile(data, userId, token))
    };

    return (
        <div>
            <div className="container">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">

                                        <h5 className="user-name">Nom d'utilisateur
                                            : {!profileIsEmpty && aProfile.username}</h5>
                                        <h6 className="user-email">Email : {!profileIsEmpty && aProfile.email}</h6>
                                    </div>
                                    <div className="about">
                                        <h5>Bio : </h5>
                                        <p>{!profileIsEmpty && aProfile.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12"
                          onSubmit={e => handleEditProfile(e)}
                    >
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Données de votre profil</h6>
                                    </div>


                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Nom d'utilisateur</label>
                                            <input type="text" className="form-control" id="fullName"
                                                   placeholder={aProfile.username}
                                                   required onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail"
                                                   placeholder={aProfile.email}
                                                   required onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="row gutters my-3">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-group">
                                            <label htmlFor="bio">Biographie</label>
                                            <textarea className="form-control" id="bio" rows="3"
                                                      placeholder={aProfile.bio}
                                                      onChange={(e) => setBio(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="supprimer" name="supprimer"
                                                    className="btn btn-primary m-2"
                                                    onClick={() => {
                                                        setModalIsOpen(true)
                                                    }}
                                            >Supprimer Mon compte
                                            </button>
                                            <button type="submit" id="miseajour" name="miseajour"
                                                    className="btn btn-primary">Mise à jour
                                            </button>

                                            <Modal
                                                style={customStyles}
                                                isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title m-4">Etes-vous sûr de vouloir
                                                            supprimer votre compte ? </h5>

                                                        <button type="button" id="miseajour" name="miseajour"
                                                                className="btn btn-primary  mx-4"
                                                                onClick={() => {
                                                                    setModalIsOpen(false)
                                                                }}

                                                        >Annuler
                                                        </button>
                                                        <button type="button" id="supprimer" name="supprimer"
                                                                className="btn btn-primary m-2"
                                                                onClick={() => {
                                                                    dispatch(deleteProfile(userId, token))
                                                                    logout()
                                                                    location.replace("/")
                                                                }}
                                                        >Confirmer
                                                        </button>
                                                    </div>
                                                </div>
                                            </Modal>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;