# 1. เลือก Base Image (เหมือนเลือกระบบปฏิบัติการตั้งต้นที่ติดตั้ง Node.js มาให้แล้ว)
# ใช้เวอร์ชัน alpine เพราะมีขนาดเล็กมากและทำงานได้เร็ว
FROM node:18-alpine

# 2. กำหนดโฟลเดอร์ทำงานภายใน Container
WORKDIR /app

# 3. คัดลอกไฟล์ package.json เข้าไปก่อน
COPY package*.json ./

# 4. สั่งรันคำสั่งติดตั้ง Library ที่จำเป็น
RUN npm install

# 5. คัดลอกไฟล์ Source Code ทั้งหมดในโปรเจกต์เข้าไปใน Container
COPY . .

# 6. แจ้งว่า Container นี้จะเปิดพอร์ต 3000 ให้คนภายนอกเข้ามาใช้งานเว็บได้
EXPOSE 3000

# 7. คำสั่งรันแอปพลิเคชันเมื่อ Container เริ่มทำงาน
CMD ["npm", "start"]