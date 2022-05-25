import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Store/user.slice';
const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-secondary mt-0'>
                <div className='navbar-brand'>Online Exam Portal</div>
                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item active'>
                            <Link to='/exams' className='nav-link'>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item active'>
                            <Link to='/addexam' className='nav-link'>
                                Add Exam
                            </Link>
                        </li>
                        {/* <li className='nav-item active'>
                            <Link to='/exams' className='nav-link'>
                                Exams
                            </Link>
                        </li> */}
                        <li className='nav-item active'>
                            <Link to='/reports' className='nav-link'>
                                Reports
                            </Link>
                        </li>
                        <li className='nav-item active'>
                            <Link to='/profile' className='nav-link'>
                                Profile
                            </Link>
                        </li>
                        <li className='nav-item active'>
                            {isAuthenticated ? (
                                <Link
                                    to='/'
                                    className='nav-link'
                                    onClick={() => dispatch(logout())}>
                                    Logout
                                </Link>
                            ) : (
                                <Link to='/login' className='nav-link'>
                                    Login
                                </Link>
                            )}
                        </li>
                        {!isAuthenticated && (
                            <li className='nav-item active'>
                                <Link to='/signup' className='nav-link'>
                                    Register
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
