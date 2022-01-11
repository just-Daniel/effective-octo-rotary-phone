import { userAPI } from "../api/api";

const SET_USERS = 'SET_USERS';

const initialState = {
    users: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS: 
            return { ...state, users: action.payload }
        
        default: return state;
    }
}

export const getAllUsers = () => async dispatch => {
    const users = await userAPI.getAllUsers();
    dispatch({type: SET_USERS, payload: users})
}

export default usersReducer;