const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://bp-golf-app-frontend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const courseSchema = new mongoose.Schema({
    name: String,
    holes: Number
});

const scoreSchema = new mongoose.Schema({
    playerName: String,
    courseId: String,
    courseName: String,
    holeScores: [Number],
    total: Number,
    date: Date
});

const Course = mongoose.model('Course', courseSchema);
const Score = mongoose.model('Score', scoreSchema);

app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/scores', async (req, res) => {
    try {
        const course = await Course.findById(req.body.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        const score = new Score({
            playerName: req.body.playerName,
            courseId: req.body.courseId,
            courseName: course.name,
            holeScores: req.body.holeScores,
            total: req.body.total,
            date: req.body.date
        });
        await score.save();
        res.status(201).json(score);
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));