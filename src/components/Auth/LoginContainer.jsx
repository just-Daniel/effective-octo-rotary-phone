import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../redux/auth-reducer';
import { changeLogin } from '../../redux/form-reducer';
import InputContainer from '../../UI/Input/InputContainer';

const loginHandler = (event, inputControls, props, setOnClickDisabled) => {
    event.preventDefault();
    setOnClickDisabled(true);

    // const user = {
    //     email: inputControls.email.value, 
    //     password: inputControls.password.value
    // }
    const user = {
        email: 'carolina37@gmail.com', 
        password: 'bestPassw0rd'
    }

    props.login(user).finally(() => {
        setOnClickDisabled(false);
    });
}

const LoginContainer = props => {
    const user = { ...localStorage };
    const [onClickDisabled, setOnClickDisabled] = useState(false);

    if (!!user.token || props.isAuth) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <h1>Authorization</h1>
            <form>
                <InputContainer 
                    inputControls={props.inputControls} 
                    changeInputElement={props.changeAuth}
                />
                <button
                    disabled={ !props.isFormValid || onClickDisabled }
                    onClick={event => loginHandler(event, props.inputControls, props, setOnClickDisabled)}
                >Log in</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    inputControls: state.form.login.inputControls,
    isFormValid: state.form.login.isFormValid,
    isAuth: state.auth.isAuth
})
const mapDispatchToProps = {
    changeAuth: changeLogin,
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);