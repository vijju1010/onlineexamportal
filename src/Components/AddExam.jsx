import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExamsAsync, addExamAsync } from '../Store/exams.slice';
import { checkAuth } from '../Store/user.slice';
import Navbar from './Navbar';
const AddExam = () => {
    const [count, setCount] = useState([]);
    const Exams = useSelector((state) => state.exam);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    console.log(Exams);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getExamsAsync());
        dispatch(checkAuth());
        
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
    };
    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <label>Exam Name:</label>
                <input type='text' name='examName' />
                <br />
                <br />
                {count.map((item, index) => {
                    return (
                        <div key={index}>
                            <label>Question {index + 1}:</label>
                            <input type='text' name={index} />
                            <br />
                            <br />
                            <label>Option 1:</label>
                            <input type='text' name={index} />
                            <label>Option 2:</label>
                            <input type='text' name={index} />
                            <label>Option 3:</label>
                            <input type='text' name={index} />
                            <label>Option 4:</label>
                            <input type='text' name={index} />
                            <label>Answer:</label>
                            <input type='text' name={index} />
                            <br />
                            <br />
                        </div>
                    );
                })}
                <button
                    type='button'
                    onClick={() => {
                        setCount((count) => [...count, count.length + 1]);
                    }}>
                    Add Question
                </button>
                <button>Add Exam</button>
            </form>
        </div>
    );
};

export default AddExam;
