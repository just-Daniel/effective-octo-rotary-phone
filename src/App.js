import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AnnouncementContainer from './components/Announcements/AnnouncementContainer';
import LoginContainer from './components/Auth/Login/LoginContainer';
import RegisterContainer from './components/Auth/Register/RegisterContainer';
import Header from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import PostsContainer from './components/Posts/PostsContainer';
import User from './components/User/User';
import { initializeUser } from './redux/app-reducer';
import Loader from './UI/Loader/Loader';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeUser();
    // Maybe will use redux-persist for save state initialize
  }

  render () {
    if(!this.props.initialized) {
      <Loader />
    }

    return (
      <div className="App">
        <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="main-content">

            <Routes>
              <Route path='/posts' element={ <PostsContainer /> } />
              <Route path='/announcements' element={ <AnnouncementContainer /> } />
              <Route path='/login' element={ <LoginContainer /> } />
              <Route path='/register' element={ <RegisterContainer /> } />
              <Route path='/user' element={ <User /> } />
              <Route path='/' exact element={ <Home /> } />
            </Routes>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialized: state.app.initialized
})

const mapDispatchToProps = {
  initializeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
