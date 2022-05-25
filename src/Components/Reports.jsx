import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { checkAuth } from '../Store/user.slice';
import { getReportAsync, setReport } from '../Store/exams.slice';
import Navbar from './Navbar';
const Reports = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reports = useSelector((state) => state.exam.reports);
    const user = useSelector((state) => state.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const report = [
        {
            id: 1,
            examName: 'Maths',
            score: '80',
            date: '2020-06-01',
        },
    ];
    // reports.map((report, index) => {
    //                   return (
    //                       <div key={index}>
    //                           <h3>Exam Name : {report.examName}</h3>
    //                           <h3>Score : {report.score}</h3>
    //                           <button
    //                               type='button'
    //                               onClick={() => {
    //                                   dispatch(setReport(report));
    //                                   navigate('/report');
    //                               }}>
    //                               view report
    //                           </button>
    //                       </div>
    //                   );
    //               })
    useEffect(() => {
        dispatch(checkAuth());
        if (!isAuthenticated) {
            navigate('/login');
        }
        if (user.user != null) {
            console.log(user, 'user');
            dispatch(getReportAsync(user.user._id));
            console.log(reports, 'reports');
        }
    }, [dispatch, isAuthenticated, reports]);
    return (
        <div>
            <Navbar />
            {reports.length > 0 ? (
                <>
                    <table
                        className='table'
                        style={{
                            margin: '10px 10px 10px 10px',
                        }}>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>S.NO</th>
                                <th scope='col'>Exam Name</th>
                                <th scope='col'>Score</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>View Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{report.examName}</td>
                                        <td>{report.score}</td>
                                        <td>{report.date}</td>
                                        <td>
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={() => {
                                                    dispatch(setReport(report));
                                                    navigate('/report');
                                                }}>
                                                view report
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <h1>No Reports</h1>
            )}
        </div>
    );
};

export default Reports;
