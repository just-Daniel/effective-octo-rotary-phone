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
                token: null
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

  return { type: AUTH_LOGOUT };
};

export const autoLogout = expireInOneHour => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expireInOneHour)
}

export const autoLogin = () => dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));

        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
            dispatch(autoLogout((expirationDate - new Date().getTime()) / 1000));
        }
    }
}