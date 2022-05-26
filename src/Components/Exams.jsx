import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getExamsAsync } from '../Store/exams.slice';
import { checkAuth } from '../Store/user.slice';
import { useNavigate } from 'react-router-dom';

const Exams = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Exams = useSelector((state) => state.exam);
    const user = useSelector((state) => state.user);
    console.log(Exams, 'exams');
    useEffect(() => {
        dispatch(getExamsAsync());
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            {Exams.exams.length > 0 ? (
                <div className='container'>
                    {Exams.exams.map((item, index) => {
                        return (
                            <div key={index}>
                                {/* <h1>{item.name}</h1>
                                <h2>{item.questions.length} Questions</h2>
                                <button
                                    onClick={() =>
                                        navigate('/exams/' + item._id)
                                    }>
                                    Start Exam
                                </button> */}
                                <div className='col-md-12 col-lg-4 col-sm-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>
                                                {item.name}
                                            </h5>
                                            <p className='card-text'>
                                                {item.questions.length}
                                                Questions
                                            </p>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        '/exams/' + item._id
                                                    )
                                                }
                                                className='btn btn-primary'>
                                                Start Exam
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                'no exams'
            )}
        </div>
    );
};

export default Exams;
