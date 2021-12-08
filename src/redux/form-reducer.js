const CHANGE_POST = 'CHANGE_POST';
const SUBMIT_POST = 'SUBMIT_POST';
const CHANGE_LOGIN = 'CHANGE_LOGIN';

const initialState = {
    post: { 
        isFormValid: false,
        inputControls: {
            title: {
                value: '',
                type: '',
                errorMessage: 'Enter correct value',
                label: 'Input title:',
                placeholder: 'Title',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            }, 
            body: {
                value: '',
                type: '',
                errorMessage: 'Enter correct value',
                label: 'Input text:',
                placeholder: 'Text',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            }
        } 
    },
    login: { 
        isFormValid: false,
        inputControls: {
            email: {
                value: '',
                type: 'email',
                errorMessage: 'Enter correct value',
                label: 'Input email:',
                placeholder: 'Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            }, 
            password: {
                value: '',
                type: 'password',
                errorMessage: 'Enter correct value, min length 6 symbols',
                label: 'Input password:',
                placeholder: 'Password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        } 
    }
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_POST: {
            return {
                ...state,
                post: {
                    ...state.post,
                    isFormValid: action.payload.isFormValid,
                    inputControls: {
                        ...state.post.inputControls,
                        ...action.payload.inputControls
                    }
                }
            }
        }
        case CHANGE_LOGIN: {
            return {
                ...state,
                login: {
                    ...state.login,
                    isFormValid: action.payload.isFormValid,
                    inputControls: {
                        ...state.login.inputControls,
                        ...action.payload.inputControls
                    }
                }
            }
        }

        default: return state
    }
}



export const changePost = (inputControls, isFormValid) => ({
    type: CHANGE_POST, 
    payload: {inputControls, isFormValid}
});

export const changeLogin = (inputControls, isFormValid) => ({
    type: CHANGE_LOGIN, 
    payload: {inputControls, isFormValid}
});

export const submitPost = () => {
    console.log('here');

    return { action: SUBMIT_POST }
}
