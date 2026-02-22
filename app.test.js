const request = require('supertest');

// --- เพิ่มท่าไม้ตาย: จำลอง Redis Database ปลอม (Mocking) ---
jest.mock('redis', () => ({
    createClient: () => ({
        connect: jest.fn().mockResolvedValue(), // จำลองว่าต่อ DB สำเร็จแล้ว
        get: jest.fn().mockResolvedValue('0'),  // จำลองว่าดึงข้อมูลได้
        set: jest.fn().mockResolvedValue('OK')  // จำลองว่าบันทึกข้อมูลได้
    })
}));
// -----------------------------------------------------

const app = require('./server'); // ต้องดึง app มาทีหลังสุด

describe('Test Web Application', () => {
    it('หน้า /health ควรจะตอบกลับมาว่า OK (Status 200)', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('OK');
    });
});