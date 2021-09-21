import {GET_PROFILE, EDIT_PROFILE, DELETE_PROFILE} from "../actions/profile.action";

const initialState = {};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return action.payload;

        case EDIT_PROFILE:
            const profile = state

            if (profile.id === action.payload.id) {
                return {
                    ...profile,
                    username: action.payload.username,
                    email: action.payload.email,
                    bio: action.payload.bio
                };
            } else return profile;

        case DELETE_PROFILE:
            return state.filter((profile) => profile.id !== action.payload.id);
        default:
            return state
    }
}