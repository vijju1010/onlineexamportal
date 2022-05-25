import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Exams from './Components/Exams';
import Login from './Components/Login';
import Exam from './Components/Exam';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import { store } from './Store';
import { Provider } from 'react-redux';
import AddExam from './Components/AddExam';
import Report from './Components/Report';
import Reports from './Components/Reports';
import Adminprofile from './Components/Adminprofile';
import Students from './Components/Students';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<About />} />
                    <Route path='/exams' element={<Exams />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/report' element={<Report />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/exams' element={<Exams />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/addexam' element={<AddExam />} />
                    <Route path='/exams/:id' element={<Exam />} />
                    <Route path='/students' element={<Students />} />
                    <Route path='/profile/admin' element={<Adminprofile />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
