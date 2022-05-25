import React, { useEffect } from 'react';
import { loginAsync, checkAuth } from '../Store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    useEffect(() => {
        dispatch(checkAuth());
        console.log(isAuthenticated, 'isAuthenticated');
        if (isAuthenticated) {
            navigate('/exams');
        }
    }, [dispatch, isAuthenticated, navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        dispatch(loginAsync(user));
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type='text' name='email' />
                <br />
                <br />
                <label>Password:</label>
                <input type='text' name='password' />
                <br />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
