const axios = require('axios');

const baseURL = 'http://localhost:8080';
let token = '';
let createdLessonId = null;

beforeAll(async () => {
    const authResponse = await axios.post(`${baseURL}/auth/sign-in`, {
        email: 'manager@gmail.com',
        password: 'Qwerty!123'
    });
    token = authResponse.data.token;
    axios.defaults.headers.common['Authorization'] = `Bearer_${token}`;
});

describe('Lesson API Tests', () => {


    test('GET /lessons', async () => {
        const response = await axios.get(`${baseURL}/lessons`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    test('POST /lessons - 400', async () => {
        const invalidLesson = {
            lesson_type: "PRACTICE",
            hours: 2,
            link_to_meeting: "http://meet.google.com/test",
            subject_id: 1,
            group_id: 1
        };

        try {
            await axios.post(`${baseURL}/lessons`, invalidLesson);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test('POST /lessons - 400', async () => {
        const invalidLesson = {
            lesson_type: "LABORATORY",
            hours: 2,
            link_to_meeting: "http://meet.google.com/test",
            teacher_id: 1,
            group_id: 1
        };

        try {
            await axios.post(`${baseURL}/lessons`, invalidLesson);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
});