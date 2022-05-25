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
    }, [dispatch, isAuthenticated]);
    return (
        <div>
            <Navbar />
            {reports.length > 0
                ? reports.map((report, index) => {
                      return (
                          <div key={index}>
                              <h3>Exam Name : {report.examName}</h3>
                              <h3>Score : {report.score}</h3>
                              <button
                                  type='button'
                                  onClick={() => {
                                      dispatch(setReport(report));
                                      navigate('/report');
                                  }}>
                                  view report
                              </button>
                          </div>
                      );
                  })
                : 'no reports'}
        </div>
    );
};

export default Reports;
