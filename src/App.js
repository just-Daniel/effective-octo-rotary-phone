import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AnnouncementContainer from './components/Announcements/AnnouncementContainer';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import PostsContainer from './components/Posts/PostsContainer';

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div style={{background: 'aliceblue'}} className="main-content">

          <Routes>
            <Route path='/posts' element={ <PostsContainer /> } />
            <Route path='/announcements' element={ <AnnouncementContainer /> } />
            <Route path='/' exact element={ <Home /> } />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
