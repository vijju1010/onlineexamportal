import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';

var mongoDB =
    'mongodb+srv://vijay:1234@cluster0.mcuqt.mongodb.net/MCQRECT?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const usersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    profileimg: String,
    password: String,
    access: String,
    address: String,
    mobile: String,
    education: String,
});
const User = mongoose.model('User', usersSchema);
const examsSchema = new mongoose.Schema({
    name: String,
    questions: [
        {
            question: String,
            options: Array,
            answer: String,
        },
    ],
});
const Exam = mongoose.model('Exam', examsSchema);

const reportSchema = new mongoose.Schema({
    userId: String,
    examId: String,
    examName: String,
    questions: Array,
    score: Number,
    date: String,
});
const Report = mongoose.model('Report', reportSchema);
app.post('/updateProfileImg', (req, res) => {
    const { user, img } = req.body;

    User.findOneAndUpdate(
        { _id: user._id },
        { profileimg: img },
        {
            new: true,
        },
        (err, doc) => {
            if (err) {
                res.json({ success: true, err });
            } else {
                res.json({ success: true, user: doc });
            }
        }
    );
});

app.post('/updateUserProfile', (req, res) => {
    const { name, _id, surname, mobile, address, education, profileimg } =
        req.body;
    console.log(req.body, 'req.body');
    User.findOneAndUpdate(
        { _id: _id },
        {
            name: name,
            surname: surname,
            mobile: mobile,
            address: address,
            education: education,
            profileimg: profileimg,
        },
        { new: true },
        (err, doc) => {
            if (err) {
                console.log(err);
                res.json({ success: false, err });
            } else {
                console.log(doc);
                res.json({ success: true, user: doc });
            }
        }
    );
});

app.post('/genreport', (req, res) => {
    const { examId, answers, userId, score } = req.body;
    console.log(examId, answers, userId, score, '/genreport');
    const exam = Exam.findOne({ _id: examId }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            const exam = doc.questions;
            let questions = [];
            // console.log(exam, 'exam');

            exam.forEach((item) => {
                const { question, options, answer } = item;
                const userAnswer = answers[item._id];
                const correct = userAnswer == answer;
                console.log(
                    answers[item._id],
                    answer,
                    correct,
                    'userAnswer, answer, correct'
                );
                console.log(doc.name, 'doc.name');
                questions.push({
                    question,
                    options,
                    answer,
                    userAnswer,
                    correct,
                });
            });

            const date = new Date().toLocaleDateString();
            const report = new Report({
                examName: doc.name,
                examId,
                questions,
                score,
                date,
                userId,
            });
            report.save((err, doc) => {
                if (err) {
                    res.json({ success: false, err });
                } else {
                    res.json({ success: true, report: doc });
                }
            });
        }
    });
});

app.post('/getreports', (req, res) => {
    const { userId } = req.body;
    console.log(userId, '/getreports');
    Report.find({ userId }, (err, doc) => {
        if (err) {
            res.json({ success: false, err });
        } else {
            res.json({ success: true, reports: doc });
        }
    });
});

app.get('/getexams', (req, res) => {
    console.log('getexams');
    Exam.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Error while fetching exams',
            });
        } else {
            res.json({
                success: true,
                message: 'Exams fetched successfully',
                exams: data,
            });
        }
    });
});
app.post('/addexam', (req, res) => {
    console.log(req.body, 'req.body');
    var questions = [];
    for (var i = 1; i < req.body.questions.length; i += 6) {
        questions.push({
            question: req.body.questions[i],
            options: [
                req.body.questions[i + 1],
                req.body.questions[i + 2],
                req.body.questions[i + 3],
                req.body.questions[i + 4],
            ],
            answer: req.body.questions[i + 5],
        });
    }

    const exam = new Exam({
        name: req.body.examName,
        questions: questions,
    });
    console.log(exam, 'exam');
    exam.save((err, data) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Error while adding exam',
            });
        } else {
            res.json({
                success: true,
                message: 'Exam added successfully',
                exam: data,
            });
        }
    });
});

app.post('/registeruser', (req, res) => {
    console.log(req.body, 'req.body');
    const newUser = new User({
        name: '',
        email: req.body.email,
        password: req.body.password,
        access: '',
    });
    newUser.save((err, user) => {
        if (err) {
            console.log(err, 'err');
            res.send(err);
        } else {
            console.log(user, 'user');
            res.send(user);
        }
    });
});

app.post('/authenticate', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: 'Error',
            });
        } else if (!user) {
            res.json({
                success: false,
                message: 'User not found',
            });
        } else if (user.password != req.body.password) {
            res.json({
                success: false,
                message: 'Password is incorrect',
            });
        } else {
            var token = jsonwebtoken.sign(
                {
                    email: user.email,
                },
                'secret'
            );
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                user: user,
            });
        }
    });
});

app.get('/checkAuth', (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Token is valid.',
                });
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'No token provided.',
        });
    }
});

app.get('/', function (req, res) {
    res.send('<h1>Welcome to the Pet Store</h1>');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
