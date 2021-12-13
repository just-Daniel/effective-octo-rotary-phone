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

const User = () => {
    const user = { ...localStorage };

    if (!user.token) {
        return <Navigate to='/' />
    }
    
    return (
        <div>
            <h1>Profile</h1>

            <img style={ styleImg } src={user.avatar !== 'undefined' || avatarImg} alt="user avatar" />

            <h3>Name: {user.firstName}</h3>
            <h3>Surname: {user.lastName}</h3>

            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}

//   Don`t use 
const mapStateToProps = state => ({
    avatar: state.auth.avatar,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    age: state.auth.age,
    email: state.auth.email
})

export default connect(mapStateToProps)(User);