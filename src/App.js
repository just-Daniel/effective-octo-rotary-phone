import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Announcement from './pages/Announcement/Announcement';
// import AnnouncementContainer from './components/Announcements/AnnouncementContainer';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import User from './components/User/User';
import { initializeUser } from './redux/app-reducer';
import Loader from './UI/Loader/Loader';
import Register from './pages/Register/Register';
import Article from './pages/Article/Article';

const App = props => {
  props.initializeUser();
  
    if(!props.initialized) {
      <Loader />
    }

    return (
      <div className="App">
        <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="main-content">

            <Routes>
              <Route path='/posts' element={ <Article /> } />
              <Route path='/announcements' element={ <Announcement /> } />
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/user' element={ <User /> } />
              <Route path='/' exact element={ <Home /> } />
            </Routes>
          </div>

        </div>
      </div>
    );
}



const mapStateToProps = state => ({
  initialized: state.app.initialized
})

const mapDispatchToProps = {
  initializeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
