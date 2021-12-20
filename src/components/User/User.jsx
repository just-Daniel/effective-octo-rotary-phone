import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import avatarImg from '../../assets/avatar.png';

const styleImg = {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    objectFit: 'cover'
}

const User = props => {
    const user = { ...localStorage };

    if (!user.token) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <h1>Profile</h1>

            <img style={ styleImg } src={props.avatar || avatarImg} alt="user avatar" />

            <h3>Name: {props.firstName}</h3>
            <h3>Surname: {props.lastName}</h3>

            <p>Age: {props.age}</p>
            <p>Email: {props.email}</p>
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