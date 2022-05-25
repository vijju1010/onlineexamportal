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
            if (question.answer == checked[question._id]) {
                tempscore += 1;
            }
        });
        console.log(tempscore, 'tempscore');
        setScore(tempscore);
        dispatch(genReportAsync(examId, checked, tempscore, user.user._id));
        navigate('/report');
    };
    const [score, setScore] = React.useState('');
    const [checked, setChecked] = React.useState({});
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{exam.name}</h1>
                <h2>{exam.questions.length} Questions</h2>
                {exam.questions.map((question, index) => {
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
                                            onChange={(e) => {
                                                setChecked({
                                                    ...checked,
                                                    [question._id]: option,
                                                });
                                            }}
                                        />
                                        {option}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Exam;
