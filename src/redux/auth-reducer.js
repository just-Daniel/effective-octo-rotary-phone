import { authAPI } from "../api/api";

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

const initialState = {
    isAuth: false,
    token: null,
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    age: null,
    avatar: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS: 
            return {
                ...state,
                isAuth: true, 
                token: action.payload.token,
                ...action.payload.userData
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
                id: null,
                firstName: '',
                lastName: '',
                email: '',
                age: null,
                avatar: ''
            }

        default: return state;
    }
}

export const authSuccess = (token, user) => {
    return {
    type: AUTH_SUCCESS, payload: {
        token, 
        userData: {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email, 
            age: user.age, 
            avatar: user.avatar, 
            id: user.id
        }
    }
}};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('email');
  localStorage.removeItem('age');
  localStorage.removeItem('avatar');
  
  localStorage.removeItem('password');

  return { type: AUTH_LOGOUT };
};

export const autoLogout = expireInOneHour => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expireInOneHour)
}

export const login = user => async dispatch => {
    const data = await authAPI.login(user);
    console.log('DATA', data);
    
    const oneHourInMS = 3600 * 1000;
    const expirationDate = new Date(new Date().getTime() + oneHourInMS);

    console.log('LOGIN expirationDate ', expirationDate);

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('firstName', data.user.firstname);
    localStorage.setItem('lastName', data.user.lastname);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('age', data.user.age);
    localStorage.setItem('avatar', data.user.avatar);

    localStorage.setItem('password', user.password);

    dispatch(authSuccess(data.accessToken, data.user));
    dispatch(autoLogout(oneHourInMS));
}