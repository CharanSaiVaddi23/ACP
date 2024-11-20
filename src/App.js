import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import Signup from './pages/Signup';
import LoginChoice from './components/LoginChoice';
import StudentPage from './pages/StudentPage';
import CompleteProfile from './components/CompleteProfile'; // Import your profile completion page
import ConnectionsPage from './pages/ConnectionsPage';
import FeedbackForm from './pages/feedbackForm';
import AlumniPage from './pages/AlumniPage'
import AboutUs from './pages/About';
import OurMissionPage from './pages/OurMission';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<LoginChoice />} />
                <Route path="/login/:userType" element={<UserLogin />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/connectionsPage" element={<ConnectionsPage />} /> 
                <Route path="/complete-profile/:srn" element={<CompleteProfile />} />
                <Route path="/feedbackform" element={<FeedbackForm />} />
                <Route path="/alumni" element={<AlumniPage />} />
                <Route path='aboutUs' element={<AboutUs/>}/>
                <Route path='OurMission' element={<OurMissionPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
