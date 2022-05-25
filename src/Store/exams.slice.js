import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    exams: [],
    report: null,
    reports: [],
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
            console.log(state.report, 'state.report');
        },
        setReports: (state, action) => {
            state.reports = action.payload;
            console.log(state.reports, 'state.reports');
        },
    },
});
export const { setExams, setReport, setReports } = examsSlice.actions;
export default examsSlice.reducer;

export const getExamsAsync = () => {
    console.log('getExamsAsync');
    return async (dispatch) => {
        fetch('http://localhost:3001/getexams')
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
        const response = await fetch('http://localhost:3001/addexam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exam),
        });
        const res = await response.json();
        if (res.success) {
            dispatch(getExamsAsync());
        } else {
            console.log(res.message);
        }
    };
};
export const genReportAsync = (examId, checked, score, userId) => {
    console.log(examId, checked, score, userId);
    return async (dispatch) => {
        const response = await fetch('http://localhost:3001/genreport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ examId, answers: checked, userId, score }),
        });
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
        fetch('http://localhost:3001/getreports', {
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
