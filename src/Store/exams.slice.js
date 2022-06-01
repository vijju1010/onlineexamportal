import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    exams: [],
    report: null,
    reports: [],
    students: [],
};
const examsSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {
        setExams: (state, action) => {
            state.exams = action.payload;
        },
        setReport: (state, action) => {
            state.report = action.payload;
            // console.log(state.report, 'state.report');
        },
        setReports: (state, action) => {
            state.reports = action.payload;
            // console.log(state.reports, 'state.reports');
        },
        setStudents: (state, action) => {
            state.students = action.payload;
            // console.log(state.students, 'state.students');
        },
    },
});
export const { setExams, setReport, setReports, setStudents } =
    examsSlice.actions;
export default examsSlice.reducer;

export const getExamsAsync = () => {
    console.log('getExamsAsync');
    return async (dispatch) => {
        fetch('https://mcqbackend.herokuapp.com/getexams')
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    console.log(res.exams, 'res.exams');
                    dispatch(setExams(res.exams));
                } else {
                    console.log(res.message);
                }
            });
    };
};

export const addExamAsync = (exam) => {
    console.log(exam, 'exam');
    return async (dispatch) => {
        const response = await fetch(
            'https://mcqbackend.herokuapp.com/addexam',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exam),
            }
        );
        const res = await response.json();
        if (res.success) {
            dispatch(getExamsAsync());
        } else {
            console.log(res.message);
        }
    };
};
export const genReportAsync = (examId, checked, score, user) => {
    console.log(examId, checked, score, user);
    return async (dispatch) => {
        const response = await fetch(
            'https://mcqbackend.herokuapp.com/genreport',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ examId, answers: checked, user, score }),
            }
        );
        const res = await response.json();
        if (res.success) {
            console.log('report generated');
            dispatch(setReport(res.report));
        } else {
            console.log(res.message);
        }
    };
};

export const getReportAsync = (userId) => {
    console.log(userId, 'user id');
    return async (dispatch) => {
        fetch('https://mcqbackend.herokuapp.com/getreports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    console.log(res.reports, 'res.report');
                    dispatch(setReports(res.reports));
                } else {
                    console.log(res.message);
                }
            });
    };
};
export const getAllStudents = () => {
    return async (dispatch) => {
        fetch('https://mcqbackend.herokuapp.com/getallreports')
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    // console.log(res.reports, 'res.reports');

                    dispatch(setStudents(res.reports));
                } else {
                    console.log(res.message);
                }
            });
    };
};
