const Session = require('../models/Session');
const { createZoomMeeting } = require('./createZoom.metting');

const createSession = async (req, res) => {
    const { teacher, student, skill, date } = req.body;

    if (!teacher || !student || !skill || !date) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // التحقق من التنسيق إذا كان في تنسيق YYYY-MM-DD أو ISO 8601
    const isValidISODate = !isNaN(new Date(date).getTime()); // التحقق إذا كان التاريخ صالحًا
    if (!isValidISODate) {
        return res.status(400).json({
            message: 'Invalid date format. Please provide a valid date in DD/MM/YYYY format.'
        });
    }

    try {
        console.log('the date is');
        
        const zoomMeetingUrl = await createZoomMeeting('Skill Swap Session', date);

        // إنشاء الجلسة في قاعدة البيانات
        const newSession = new Session({
            teacher: teacher,
            student: student,
            skill: skill,
            date: date, // التاريخ بصيغة ISO 8601 أو YYYY-MM-DD
            status: 'pending',
            meetingUrl: zoomMeetingUrl
        });

        const savedSession = await newSession.save();
        res.status(201).json(savedSession);
    } catch (error) {
        console.error('Error creating session:', error.message || error);
        res.status(500).json({ message: 'Error creating session', error: error.message });
    }
};



module.exports = { createSession };
