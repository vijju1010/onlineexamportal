import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync, checkAuth } from '../Store/user.slice';
import { getAllStudents } from '../Store/exams.slice';
const Students = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const students = useSelector((state) => state.exam.students);
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllStudents());
    }, [dispatch]);
    console.log(students, 'students');
    return (
        <div>
            <h1>Students</h1>
            {students.length > 0 ? (
                <div className='container'>
                    {students.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='col-md-12 col-lg-4 col-sm-3'>
                                    <div
                                        className='card text-center mb-3'
                                        style={{
                                            width: '25rem',
                                            height: '25rem',
                                        }}>
                                        <img
                                            class='card-img-top img-fluid img-thumbnail '
                                            src={
                                                item.user.user.profileimg !=
                                                    '' ||
                                                item.user.user.profileimg !=
                                                    null
                                                    ? item.user.user.profileimg
                                                    : 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                                            }
                                            alt={item.user.user.name}
                                        />
                                        <div class='card-block'>
                                            <h4 class='card-title mt-5'>
                                                {item.user.user.name}
                                            </h4>
                                            <p class='card-text'>
                                                Email : {item.user.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>No students</div>
            )}
        </div>
    );
};

export default Students;
