import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const About = () => {
    return (
        <div>
            <Navbar />
            <li className='nav-item active'>
                <Link to='/addexam' className='nav-link'>
                    Add Exam
                </Link>
            </li>
            <li className='nav-item active'>
                <Link to='/profile/admin' className='nav-link'>
                    Admin Profile
                </Link>
            </li>
        </div>
    );
};

export default About;
