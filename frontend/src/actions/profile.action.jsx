import axios from "axios";
import _ from "lodash";
import {successDeleteProfile} from "../services/notifications";


export const GET_PROFILE = "GET_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";


export const getProfile = () => {
    const token = window.localStorage.getItem("userToken").replace(/"/g, '');
    const userId = window.localStorage.getItem("userId");
    const tokenIsEmpty = _.isEmpty(token);

    return (dispatch) => {
        return axios({
            method: "GET",
            url: `http://localhost:4200/groupomania/profile/${userId}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: userId
            }

        }, [])
            .then((res) => {
                    console.log(res)
                    !tokenIsEmpty && dispatch({type: GET_PROFILE, payload: res.data.user})

                }
            )
            .catch((error) => console.log(error))
    };
};


export const editProfile = (data, userId, token) => {
    console.log(data)

    return (dispatch) => {
        return axios({
            method: "PUT",
            url: `http://localhost:4200/groupomania/profile/${userId}`,
            data,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: userId
            }

        }, [])
            .then((res) => {
                    console.log(res.data.user.email)
                    dispatch({type: EDIT_PROFILE,
                        payload: {
                            email: res.data.user.email,
                            username: res.data.user.username,
                            bio: res.data.user.bio,
                            id: res.data.user.id
                        }
                    });
                }
            )
            .catch((error) => console.log(error))
    };
};


export const deleteProfile = (userId, token) => {
    console.log(userId);
    console.log(token);

    return (dispatch) => {
        return axios({
            method: "DELETE",
            url: `http://localhost:4200/groupomania/profile/${userId}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                id: userId
            }

        }, [])
            .then((res) => {
                    console.log(res)
                    dispatch({type: DELETE_PROFILE, payload: {id: res.data.user.id}});
                    successDeleteProfile.success("Votre compte a bien été supprimer !");

                }
            )
            .catch((error) => console.log(error))
    };
};