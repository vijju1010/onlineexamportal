import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExamsAsync, addExamAsync } from '../Store/exams.slice';
import { checkAuth } from '../Store/user.slice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const AddExam = () => {
    const [count, setCount] = useState([]);
    const [n, setN] = useState(1);

    const navigate = useNavigate();
    const Exams = useSelector((state) => state.exam);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user);
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    console.log(user.user.access, 'access');
    useEffect(() => {
        dispatch(getExamsAsync());
        dispatch(checkAuth());
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        var data = new FormData(e.target);
        var questions = [];
        data.forEach((value, key) => {
            questions.push(value);
        });
        var obj = {
            examName: data.get('examName'),
            questions: questions,
        };
        dispatch(addExamAsync(obj));
        e.target.reset();
        setCount([]);
    };
    return (
        <div>
            <Navbar />
            {user.user.access === 'admin' ? (
                <form onSubmit={handleSubmit}>
                    <label>Exam Name:</label>
                    <input
                        type='text'
                        name='examName'
                        className='form-control mb-2 w-25'
                    />
                    <br />
                    <br />
                    {count.map((item, index) => {
                        return (
                            <div key={index}>
                                <label>Question {index + 1}:</label>
                                <textarea
                                    type='text'
                                    name={index}
                                    className='form-control mb-2 w-50'
                                />
                                <br />
                                <br />
                                <label>Option 1:</label>
                                <input
                                    type='text'
                                    name={index}
                                    className='form-control mb-2 w-25'
                                />
                                <label>Option 2:</label>
                                <input
                                    type='text'
                                    name={index}
                                    className='form-control mb-2 w-25'
                                />
                                <label>Option 3:</label>
                                <input
                                    type='text'
                                    name={index}
                                    className='form-control mb-2 w-25'
                                />
                                <label>Option 4:</label>
                                <input
                                    type='text'
                                    name={index}
                                    className='form-control mb-2 w-25'
                                />
                                <label>Answer:</label>
                                {/* <input
                                    type='text'
                                    name={index}
                                    className='form-control w-auto'
                                /> */}
                                <select
                                    name={index}
                                    className='form-control w-auto'
                                    onChange={(e) =>
                                        setOptions(e.target.value)
                                    }>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select>
                                {/* <button
                                    type='button'
                                    className='btn btn-danger'
                                    onClick={() => {
                                        console.log(count, 'count');
                                        console.log(index, 'index');
                                        console.log(item, 'item');
                                        setCount(
                                            count.filter(
                                                (item1, indx) => item1 !== item
                                            )
                                        );
                                    }}>
                                    Remove Question
                                </button> */}
                                <br />
                                <br />
                            </div>
                        );
                    })}
                    <button
                        type='button'
                        className='btn btn-info'
                        onClick={() => {
                            setN(n + 1);
                            setCount((count) => [...count, n]);
                            console.log(count, 'count after add');
                        }}>
                        Add Question
                    </button>
                    <button className='btn btn-primary ml-4'>Add Exam</button>
                </form>
            ) : (
                <>
                    <p>user</p>
                </>
            )}
        </div>
    );
};

export default AddExam;
