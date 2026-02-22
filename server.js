const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

// เชื่อมต่อ Redis (ใช้ชื่อ Service "my-database" ที่เราตั้งใน K8s)
const client = redis.createClient({
    url: 'redis://my-database:6379'
});
client.connect().catch(console.error);

app.get('/', async (req, res) => {
    // ดึงค่า visitor count และบวกเพิ่ม 1
    let visits = await client.get('visits') || 0;
    visits++;
    await client.set('visits', visits);

    // --- ส่วนที่แก้ไขใหม่: HTML และ CSS สวยๆ ---
    res.send(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My DevOps Portfolio Project</title>
            <style>
                /* ตั้งค่าพื้นหลังแบบไล่สี (Gradient) */
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    color: #333;
                }
                /* กล่องคอนเทนเนอร์ตรงกลาง */
                .card {
                    background-color: #ffffff;
                    padding: 40px 50px;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    text-align: center;
                    max-width: 600px;
                    width: 90%;
                }
                /* ไอคอนจรวด */
                .icon {
                    font-size: 4em;
                    margin-bottom: 10px;
                    animation: float 3s ease-in-out infinite;
                }
                /* หัวข้อหลัก */
                h1 {
                    color: #2d3748;
                    font-size: 2.2em;
                    margin-bottom: 15px;
                }
                /* ไฮไลท์สีม่วง */
                .highlight {
                    color: #667eea;
                    font-weight: bold;
                }
                /* คำอธิบาย */
                p.description {
                    color: #718096;
                    font-size: 1.1em;
                    margin-bottom: 30px;
                    line-height: 1.6;
                }
                /* กล่องนับจำนวน */
                .counter-box {
                    background-color: #edf2f7;
                    padding: 25px;
                    border-radius: 15px;
                    font-size: 1.2em;
                    color: #4a5568;
                }
                /* ตัวเลขตัวใหญ่ๆ */
                .counter-number {
                    display: block;
                    font-size: 3em;
                    font-weight: 800;
                    color: #e53e3e; /* สีแดง */
                    margin-top: 10px;
                }
                /* อนิเมชั่นลอยไปมา */
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon">🚀</div>
                <h1>PROJECT: <span class="highlight">K8s & CI/CD Pipeline</span></h1>
                <p class="description">
                    หน้านี้รันอยู่บน <b>Kubernetes Cluster</b> <br>
                    อัปเดตอัตโนมัติด้วย <b>GitHub Actions</b> <br>
                    และเก็บข้อมูลด้วย <b>Redis Database</b>
                </p>
                <div class="counter-box">
                    👀 จำนวนผู้เข้าชม (Real-time)
                    <span class="counter-number">${visits} ครั้ง</span>
                </div>
            </div>
        </body>
        </html>
    `);
    // ------------------------------------------
});

app.listen(port, () => {
    console.log(`WebApp listening at http://localhost:${port}`);
});