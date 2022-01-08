import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import avatarImg from '../../assets/avatar.png';
import './User.module.css';

const User = props => {
    const user = { ...localStorage };

    if (!user.token) {
        return <Navigate to='/' />
    }

    return (
        <div className='main-content'>
            <h1>Profile</h1>

            <img src={props.avatar || avatarImg} alt="user avatar" />
            <div>
                <h3>Name: <span>{props.firstName}</span></h3>
                <h3>Surname: <span>{props.lastName}</span></h3>
            </div>
            
            <p>Age: <span>{props.age}</span></p>
            <p>Email: <span>{props.email}</span></p>
        </div>
    )
}

const mapStateToProps = state => ({
    avatar: state.register.isActiveImg,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    age: state.auth.age,
    email: state.auth.email
})

export default connect(mapStateToProps)(User);