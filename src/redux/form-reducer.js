const CHANGE_POST = 'CHANGE_POST';
const SUBMIT_POST = 'SUBMIT_POST';

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

        default: return state
    }
}



export const changePost = (inputControls, isFormValid) => ({
    type: CHANGE_POST, 
    payload: {inputControls, isFormValid}
});

export const submitPost = () => {
    console.log('here');

    return { action: SUBMIT_POST }
}
