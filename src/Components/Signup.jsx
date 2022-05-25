import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../Store/user.slice';
import { useNavigate } from 'react-router-dom';
import { registerUserAsync } from '../Store/user.slice';
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleSubmit = (e) => {
        e.preventDefault();
        var user = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        dispatch(registerUserAsync(user));
    };

    useEffect(() => {
        dispatch(checkAuth());
        console.log(isAuthenticated, 'isAuthenticated');
        if (isAuthenticated) {
            navigate('/exams');
        }
    }, [dispatch, isAuthenticated, navigate]);

    console.log(user, 'user');

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type='text' name='email' />
                <br />
                <br />
                <label>Password:</label>
                <input type='text' name='password' />
                <br />
                <br />
                <label>confirmPassword:</label>
                <input type='text' name='cnfpassword' />
                <br />
                <br />
                <button>Signup</button>
            </form>
        </>
    );
};

export default Signup;
