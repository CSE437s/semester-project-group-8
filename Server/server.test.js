const { simplemaxcalculate, recommendlift, app } = require('./server');
const request = require('supertest');

describe('simplemaxcalculate function', () => {
    test('should calculate the theoretical maximum lift based on weight, rep_num, and RPE', async () => {
      const weight = 100;
      const rep_num = 1;
      const rpereq = 10;
      const expected = 100;
      const result = await simplemaxcalculate(weight, rep_num, rpereq);
      expect(result).toBe(expected);
    });
});

describe('recommendlift function', () => {
    test('returns leg extension recommendation for set_num >= 3 and lift_id = 2', async () => {
        const result = await recommendlift(100, 8, 7, 2, 3, 10);
        const expected = JSON.stringify({ rec_type: "exercise", lift_id: 6 });
        expect(result).toEqual(expected);
    });

    test('returns bicep curl recommendation for set_num >= 3 and lift_id = 1', async () => {
        const result = await recommendlift(100, 8, 7, 1, 3, 10);
        const expected = JSON.stringify({ rec_type: "exercise", lift_id: 5 });
        expect(result).toEqual(expected);
    });

    test('returns lat pulldown recommendation for set_num >= 3 and lift_id = 3', async () => {
        const result = await recommendlift(100, 8, 7, 3, 3, 10);
        const expected = JSON.stringify({ rec_type: "exercise", lift_id: 4 });
        expect(result).toEqual(expected);
    });

    test('returns recommended set for set_num < 3', async () => {
        const simplemaxcalculate = jest.fn().mockResolvedValue(100);
        const result = await recommendlift(100, 8, 7, 1, 2, 10);
        const expected = JSON.stringify({
        rec_type: "set",
        weight_rec: 110,
        new_reps: 7,
        new_rpe: 8,
        lift_id: 1,
        });
        expect(result).toEqual(expected);
    });
});

describe('/getlifts endpoint', () => {
    test('should return a list of lifts', async () => {
        const response = await request(app).get('/getlifts');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach(lift => expect(lift).toHaveProperty('lift_id'));
    });
});

describe('/profile endpoint', () => {
    test('should return user data for valid user_id', async () => {
        const user_id = 1;
        const response = await request(app).get(`/profile?user_id=${user_id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should return 404 for non-existent user_id', async () => {
        const user_id = 9999;
        const response = await request(app).get(`/profile?user_id=${user_id}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: "false",
            message: "No user data"
        });
    });
});

describe('/exercisehistory endpoint', () => {
    test('should return all exercise data for a given user', async () => {
        const user_id = 1; 
        const response = await request(app).get(`/exercisehistory?user_id=${user_id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should return a 404 status when no exercise data exists for the user', async () => {
        const user_id = 9999; 
        const response = await request(app).get(`/exercisehistory?user_id=${user_id}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: "false",
            message: "No exercise data"
        });
    });
});




