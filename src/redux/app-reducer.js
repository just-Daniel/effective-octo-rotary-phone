import { authAPI } from "../api/api";
import { authSuccess, autoLogout, logout } from "./auth-reducer";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }

        default: return { ...state }
    }
}

const initializeSuccess = () => ({type: INITIALIZE_SUCCESS});

export const initializeUser = () => async dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));

        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            const userLocalStorage = { ...localStorage };
            const user = {
                email: userLocalStorage.email,
                password: userLocalStorage.password
            }
            const data = await authAPI.login(user);            

            dispatch(initializeSuccess());
            dispatch(authSuccess(token, data.user));
            dispatch(autoLogout(expirationDate - new Date().getTime()));
        }
    }
}