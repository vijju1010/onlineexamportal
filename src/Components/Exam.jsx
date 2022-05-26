import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { genReportAsync } from '../Store/exams.slice';
import { checkAuth } from '../Store/user.slice';
const Exam = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const Exams = useSelector((state) => state.exam);
    const examId = useParams().id;
    const exam = Exams.exams.find((exam) => exam._id === examId);
    const user = useSelector((state) => state.user);
    const report = useSelector((state) => state.exam.report);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [question, setQuestion] = React.useState(exam.questions[0]);
    console.log(report, 'report');
    useEffect(() => {
        dispatch(checkAuth());
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [dispatch, isAuthenticated]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let tempscore = 0;
        exam.questions.forEach((question, index) => {
            if (
                question.options[parseInt(question.answer) - 1] ==
                checked[question._id]
            ) {
                tempscore += 1;
            }
        });
        console.log(tempscore, 'tempscore');
        setScore(tempscore);
        dispatch(genReportAsync(examId, checked, tempscore, user));
        navigate('/report');
    };
    const [score, setScore] = React.useState('');
    const [checked, setChecked] = React.useState({});
    return (
        <div className='container mt-5'>
            <div className='.d-flex justify-content-center row'>
                <div className='col-md-10 col-lg-10'>
                    <div className='border'>
                        <div className='question bg-white p-3 border-bottom'>
                            <div className='d-flex flex-row justify-content-between align-items-center mcq'>
                                <h4 className='d-flex justify-content-center mt-3 mb-3'>
                                    {exam.name}
                                </h4>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {exam.questions.map((question, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='question p-3 border-bottom ml-5'>
                                        <div class='d-flex flex-row align-items-center question-title'>
                                            <h4 class='text-danger mr-5'>
                                                Q.{questionIndex + 1}
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
                                                                className='mr-3'
                                                                name={
                                                                    question._id
                                                                }
                                                                value={option}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setChecked({
                                                                        ...checked,
                                                                        [question._id]:
                                                                            option,
                                                                    });
                                                                }}
                                                            />
                                                            {option}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='d-flex justify-content-center mt-3 mb-3'>
                                <button
                                    type='submit'
                                    className='btn btn-danger mr-3'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exam;
