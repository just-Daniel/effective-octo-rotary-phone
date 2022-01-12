import React, { useState } from 'react';
import { connect } from 'react-redux';
import InputContainer from '../../../UI/Input/InputContainer';
import { changeRegister, showOnSubmitRegisterError, initialStateRegister } from '../../../redux/form-reducer';
import { login } from '../../../redux/auth-reducer';
import { changeActiveImg } from '../../../redux/register-reducer';
import classes from './Register.module.css'
import { authAPI } from '../../../api/api';
import { Navigate } from 'react-router-dom';
import cls from '../Auth.module.css'

const profileImgHandler = (event, images, changeActiveImg) => {
    if(event.target.nodeName === 'IMG') {
        images.map(i => {
            if (event.target.src === i.link) {            
                return i.active = true;
            } 
            return i.active = false;
        })    

        changeActiveImg(images);
    }
}

const registerHandler = (event, inputControls, isActiveImg, login, isFormValid, showOnSubmitRegisterError, setOnClickDisabled, initialStateRegister) => {
    event.preventDefault();

    if (!isFormValid) {
        return showOnSubmitRegisterError(true);
    }
   
    const user = {
        email: inputControls.email.value,
        password: inputControls.password.value,
        firstname: inputControls.firstName.value,
        lastname: inputControls.lastName.value,
        age: inputControls.age.value,
        avatar: isActiveImg
    }
    // const user = { "email": "olivier@mail.com", "password": "bestPassw0rd", "firstname": "Olivier", "lastname": "Monge", "age": 32, "avatar": "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" }
    setOnClickDisabled(true);
    authAPI.register(user).then(res => {
        login({email: user.email, password: user.password});
    }).finally(() => setOnClickDisabled(false))
    .then(() => initialStateRegister());

}

const RegisterContainer = props => {
    const [onClickDisabled, setOnClickDisabled] = useState(false);
    const user = {...localStorage};
    
    if (!!user.token || props.isAuth) {
        return <Navigate to='/' />
    }

    return (
        <div className={cls.Register}>
            <h1>Register Profile</h1>
            <form>
                <h3>Select image:</h3>
                <div onClick={event => profileImgHandler(event, props.images, props.changeActiveImg)} className={classes.imageContainer}>
                    {
                        props.images.map((i, index) => (
                            <img key={i.alt + Math.round(Math.random() * 10) + index} 
                                className={i.active ? classes.active : ''} 
                                src={i.link} alt={i.alt} />
                        ))
                    }
                </div>
                
                <InputContainer 
                    inputControls={ props.inputControls }
                    changeInputElement={ props.changeRegister }
                    showOnSubmitError={ props.showOnSubmitError }
                />

                <button
                    disabled={onClickDisabled}
                    onClick={(event) => registerHandler(event, props.inputControls, 
                    props.isActiveImg, props.login, props.isFormValid, 
                    props.showOnSubmitRegisterError, setOnClickDisabled, props.initialStateRegister)}
                >Register</button>
                {
                    props.showOnSubmitError
                    && <div className='error'>Incorrect values</div>
                }
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    inputControls: state.form.register.inputControls,
    isFormValid: state.form.register.isFormValid,
    showOnSubmitError: state.form.register.showOnSubmitError,
    images: state.register.images,
    isActiveImg: state.register.isActiveImg,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
    changeRegister,
    changeActiveImg,
    login,
    showOnSubmitRegisterError,
    initialStateRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);