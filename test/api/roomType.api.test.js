const axios = require('axios');
const { Client } = require('pg');

const baseURL = 'http://localhost:8080';
let token = '';
let createdRoomId = null;

const dbClient = new Client({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});

beforeAll(async () => {
    await dbClient.connect();
    
    const authResponse = await axios.post(`${baseURL}/auth/sign-in`, {
        email: 'manager@gmail.com',
        password: 'Qwerty!123'
    });
    token = authResponse.data.token;
    axios.defaults.headers.common['Authorization'] = `Bearer_${token}`;
});

afterAll(async () => {
    await dbClient.end();
});

describe('RoomType API CRUD Tests', () => {

    test('POST /room-types', async () => {
        const uniqueId = Date.now();
        const newRoom = {
            description: `Automated testing ${uniqueId}`,
            type: `Lab_${uniqueId}`
        };

        const response = await axios.post(`${baseURL}/room-types`, newRoom);
        expect([200, 201]).toContain(response.status);
        expect(response.data.id).toBeDefined();
        createdRoomId = response.data.id;

        const dbResult = await dbClient.query('SELECT * FROM room_types WHERE id = $1', [createdRoomId]);
        expect(dbResult.rows.length).toBe(1);
    });

    test('GET /room-types', async () => {
        const response = await axios.get(`${baseURL}/room-types`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    test('GET /room-types/:id', async () => {
        const response = await axios.get(`${baseURL}/room-types/${createdRoomId}`);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(createdRoomId);
    });

    test('PUT /room-types', async () => {
        const updatedRoom = {
            id: createdRoomId,
            description: 'Updated Description',
            type: 'Updated_Type'
        };
        const response = await axios.put(`${baseURL}/room-types`, updatedRoom);
        expect([200, 201, 204]).toContain(response.status);
    });

    test('POST /room-types - 400', async () => {
        try {
            await axios.post(`${baseURL}/room-types`, { description: '', type: '' });
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test('GET /room-types/9999999 - 404', async () => {
        try {
            await axios.get(`${baseURL}/room-types/9999999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

    test('DELETE /room-types/:id', async () => {
        const response = await axios.delete(`${baseURL}/room-types/${createdRoomId}`);
        expect([200, 204]).toContain(response.status);
    });

    test('GET /room-types/:id - 404', async () => {
        try {
            await axios.get(`${baseURL}/room-types/${createdRoomId}`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});