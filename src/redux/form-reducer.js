const CHANGE_POST = 'CHANGE_POST';
const CHANGE_LOGIN = 'CHANGE_LOGIN';
const CHANGE_REGISTER = 'CHANGE_REGISTER';
const INIT_STATE_POST = 'INIT_STATE_POST';

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
    },
    register: {
        isFormValid: false,
        inputControls: {
            firstName: {
                value: '',
                type: 'text',
                errorMessage: 'Enter correct value',
                label: 'Input first name:',
                placeholder: 'First name',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            lastName: {
                value: '',
                type: 'text',
                errorMessage: 'Enter correct value',
                label: 'Input last name:',
                placeholder: 'Last name',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            age: {
                value: '',
                type: 'number',
                errorMessage: 'Enter correct value',
                label: 'Input age:',
                placeholder: 'Age',
                min: 0,
                max: 100,
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
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
                errorMessage: 'Enter correct value, min length 6 symbols, and matching passwords',
                label: 'Input password:',
                placeholder: 'Password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                    password: true
                }
            },
            confirmPassword: {
                value: '',
                type: 'password',
                errorMessage: 'Not matching. Enter correct value!',
                label: 'Input confirm password:',
                placeholder: 'Confirm password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                    confirmPassword: true
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
        case INIT_STATE_POST: {
            return {
                ...state,
                post: initialState.post
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
        case CHANGE_REGISTER: {
            return {
                ...state,
                register: {
                    ...state.register,
                    isFormValid: action.payload.isFormValid,
                    inputControls: {
                        ...state.register.inputControls,
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

export const changeRegister = (inputControls, isFormValid) => ({
    type: CHANGE_REGISTER,
    payload: {inputControls, isFormValid}
})

export const initStatePost = () => ({type: INIT_STATE_POST});