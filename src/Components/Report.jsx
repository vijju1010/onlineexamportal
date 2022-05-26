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
            {/* {report != null &&
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
                                            checked={
                                                question.options[
                                                    parseInt(question.answer) -
                                                        1
                                                ] == option
                                            }
                                        />
                                        {option}
                                    </div>
                                );
                            })}
                            <h3>Your Answer: {question.userAnswer}</h3>
                        </div>
                    );
                })} */}
            {report != null && (
                <>
                    <div className='container mt-5'>
                        <div className='.d-flex justify-content-center row'>
                            <div className='col-md-10 col-lg-10'>
                                <div className='border'>
                                    <div className='question bg-white p-3 border-bottom'>
                                        <div className='d-flex flex-row justify-content-between align-items-center mcq'>
                                            <h4 className='d-flex justify-content-center mt-3 mb-3'>
                                                {report.examName}
                                            </h4>
                                        </div>
                                    </div>
                                    {report.questions.map((question, index) => (
                                        <div
                                            key={index}
                                            className='question p-3 border-bottom ml-5'>
                                            <div class='d-flex flex-row align-items-center question-title'>
                                                <h4 class='text-danger mr-5'>
                                                    Q.{index + 1}
                                                </h4>
                                                <h3 class='mt-1 ml-2'>
                                                    {question.question} ?
                                                </h3>
                                            </div>
                                            <div className='options ml-5'>
                                                {question.options.map(
                                                    (option, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <input
                                                                    type='radio'
                                                                    id='option'
                                                                    name={
                                                                        question._id
                                                                    }
                                                                    value={
                                                                        option
                                                                    }
                                                                    disabled
                                                                    checked={
                                                                        question.userAnswer ==
                                                                        option
                                                                    }
                                                                />
                                                                {question
                                                                    .options[
                                                                    parseInt(
                                                                        question.answer
                                                                    ) - 1
                                                                ] == option ? (
                                                                    <label for='option'>
                                                                        ✅
                                                                    </label>
                                                                ) : (
                                                                    question.userAnswer ==
                                                                        option && (
                                                                        <label for='option'>
                                                                            ❌
                                                                        </label>
                                                                    )
                                                                )}
                                                                {option}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div className='question p-3 border-bottom ml-5'>
                                        <div class='d-flex flex-row align-items-center question-title'>
                                            <h4 class='text-danger mr-5'>
                                                Total Marks:
                                            </h4>
                                            <h3 class='mt-1 ml-2'>
                                                {report.score}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Report;
