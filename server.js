const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

// ตั้งค่าการเชื่อมต่อ Redis Database
const client = redis.createClient({
  url: 'redis://my-database:6379' 
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect().catch(console.error);

app.get('/', async (req, res) => {
  try {
    // ให้ Database ช่วยบวกเลข เพิ่มจำนวนคนเข้าชม 1 ครั้ง
    const visits = await client.incr('visits');
    res.send(`<h1>Hello DevOps V2! ระบบ CI/CD ทำงานแล้ว!</h1><h2>มีคนเข้าชมเว็บนี้ ${visits} ครั้งแล้ว!</h2><p>(ข้อมูลถูกนับและเก็บไว้ใน Redis Database)</p>`);
  } catch (error) {
    res.send('<h1>กำลังเชื่อมต่อ Database... ลองรีเฟรชหน้าเว็บอีกครั้ง</h1>');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port}`);
});