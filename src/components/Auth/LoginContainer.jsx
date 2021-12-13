import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../../api/api';
import { authSuccess, autoLogout } from '../../redux/auth-reducer';
import { changeLogin } from '../../redux/form-reducer';
import InputContainer from '../../UI/Input/InputContainer';

const loginHandler = async (event, inputControls, props) => {
    event.preventDefault();
    console.log('inputControls: ', inputControls);
    // const user = {
    //     email: inputControls.email.value, 
    //     password: inputControls.password.value
    // }
    const user = {
        email: 'carolina37@gmail.com', 
        password: 'bestPassw0rd'
    }
    const data = await authAPI.login(user);
    console.log('DATA', data);
    
    const oneHourInMS = 3600 * 1000;
    const expirationDate = new Date(new Date().getTime() + oneHourInMS);

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('firstName', data.user.firstname);
    localStorage.setItem('lastName', data.user.lastname);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('age', data.user.age);
    localStorage.setItem('avatar', data.user.avatar);

    props.authSuccess(data.accessToken, data.user);
    props.autoLogout(oneHourInMS);
}



const LoginContainer = props => {
    const user = { ...localStorage };

    if (!!user.token) {
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
                    disabled={ !props.isFormValid }
                    onClick={event => loginHandler(event, props.inputControls, props)}
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
    changeAuth: changeLogin,
    authSuccess,
    autoLogout,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);