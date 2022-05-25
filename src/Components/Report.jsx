import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../Store/user.slice';
const Report = () => {
    const dispatch = useDispatch();
    const report = useSelector((state) => state.exam.report);
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    console.log(report, 'report');
    return (
        <div>
            {report != null &&
                report.questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <h3>{question.question} ? </h3>
                            {question.options.map((option, index) => {
                                return (
                                    <div key={index}>
                                        <input
                                            type='radio'
                                            name={question._id}
                                            value={option}
                                            disabled
                                            checked={question.answer == option}
                                        />
                                        {option}
                                    </div>
                                );
                            })}
                            <h3>Your Answer: {question.answer}</h3>
                        </div>
                    );
                })}
        </div>
    );
};

export default Report;
