import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth-reducer'

const Header = props => {
  const user = { ...localStorage };
  console.log('isAuth', props.isAuth, user.token);



//   After reload did not update state


  const notValidate = (isAuth, token) => {
    return !isAuth || !token;
  }

  if(notValidate(props.isAuth, user.token)) {

  }

    return (
        <header style={{background: 'yellow', gridArea: 'header'}}>
          <ul>
            <li>
              {
                !!user.token
                ? <NavLink to='/user'>{`${user.firstName} ${user.lastName}`}</NavLink>
                : <NavLink to='/login'>Log in</NavLink>
              }
              
            </li>
            <li>
              {
                !!user.token
                ? <button onClick={ props.logout }>Log out</button>
                : <NavLink to='/register'>Log up</NavLink>
              }
            </li>
          </ul>
        </header>
    )
}


const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName
})

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)