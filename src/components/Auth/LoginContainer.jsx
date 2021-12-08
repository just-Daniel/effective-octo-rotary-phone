import React from 'react';
import { connect } from 'react-redux';
import { authAPI } from '../../api/api';
import { changeLogin } from '../../redux/form-reducer';
import InputContainer from '../../UI/Input/InputContainer';

const loginHandler = (event, inputControls) => {
    event.preventDefault();
    console.log('inputControls: ', inputControls);
    const user = {
        email: inputControls.email.value, 
        password: inputControls.password.value
    }
    // const user = {
    //     email: 'carolina37@gmail.com', 
    //     password: 'bestPassw0rd'
    // }
    authAPI.login(user).then(data => {
        console.log('DATA', data);
    })
}

const LoginContainer = props => {
    return (
        <div>
            <h1>Authorization</h1>
            <form>
                <InputContainer 
                    inputControls={props.inputControls} 
                    changeInputElement={props.changeAuth}
                />
                <button
                    disabled={ !props.isFormValid }
                    onClick={event => loginHandler(event, props.inputControls)}
                >Log in</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    inputControls: state.form.login.inputControls,
    isFormValid: state.form.login.isFormValid
})
const mapDispatchToProps = {
    changeAuth: changeLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);