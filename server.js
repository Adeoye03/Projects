const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/attendance' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Attendance = mongoose.model('Attendance' , attendanceSchema);

app.post('/mark-attendance', async (req, res) => {
    const {studentId, date, status } = req.body;
    const attendance = new Attendance({ studentId, date, status});
    await attendance.save();
    res.status(201).send('Attendance marked successfully');
});

app.get('/attendance', async (req, res) => {
    const records = await Attendance.find();
    res.status(200).json(records);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});