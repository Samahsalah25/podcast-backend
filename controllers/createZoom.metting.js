
const axios = require('axios');
 const jwt=require('jsonwebtoken');
// معلومات التطبيق



const ZOOM_API_KEY = 'H1DM6zOdSk2ZnATdViiFw';
const ZOOM_API_SECRET = 'uY05viqRji6aLl3o2nfdr6GD2iSPkJa3';

const generateZoomToken = () => {
    const payload = {
        iss: ZOOM_API_KEY,
        exp: Math.floor(Date.now() / 1000) + 86400, // مدة صلاحية ساعة واحدة
    };
    const token = jwt.sign(payload, ZOOM_API_SECRET);

    console.log('Token Expiration:', new Date(payload.exp * 1000)); // عرض وقت انتهاء الصلاحية
    console.log('token is ' +token);
    
    return token;
};



const createZoomMeeting = async (topic, startTime) => {
    try {
        const accessToken = await generateZoomToken();

        const data = {
            topic,
            type: 2, // اجتماع مجدول
            start_time: startTime,
            duration: 60,
            timezone: 'UTC',
        };
        function isTokenExpired(token) {
            const decoded = jwt.decode(token, { complete: true });
            if (!decoded) {
                return true; // التوكين غير صالح
            }
        
            const currentTime = Math.floor(Date.now() / 1000); // الوقت الحالي بالتوقيت اليونكسي
            return decoded.payload.exp < currentTime; // تحقق إذا كان الوقت الحالي أكبر من وقت انتهاء الصلاحية
        }
        
        
        if (isTokenExpired(accessToken)) {
            console.log('Token has expired.');
        } else {
            console.log('Token is still valid.');
        }
        


        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
  

        return response.data.join_url; // رابط الاجتماع
    } catch (error) {
        console.log({error:error});
        
        console.error('Error creating Zoom meeting:', error.response?.data || error.message);
        throw error;
    }
};




module.exports = { createZoomMeeting };
