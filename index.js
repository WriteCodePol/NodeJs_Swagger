const express = require('express');
const swaggerSetup = require('./swagger');


const app = express();
const port = 3000;
require('dotenv').config();
app.use(express.json());
swaggerSetup(app);
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบผู้ใช้จากฐานข้อมูล (ตัวอย่างนี้ใช้ข้อมูลจำลอง)
  const user = getUserFromDatabase(username, password); // ฟังก์ชันนี้ควรตรวจสอบในฐานข้อมูลจริง

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // สร้าง token
  const token = jwt.sign({ userId: user.username }, SECRET_KEY, { expiresIn: '1h' });
  const apiName = req.path;
  const clientIp = req.ip;
  const domain = req.hostname;

  // logger.emit({ ... }); // บันทึกข้อมูล logging ที่ต้องการ

  res.json({ token });
});

// ตัวอย่างฟังก์ชันตรวจสอบผู้ใช้
function getUserFromDatabase(username, password) {
  // จำลองการตรวจสอบผู้ใช้
  const mockUser = { username: 'admin', password: '1234' }; // ข้อมูลผู้ใช้จริง
  return (username === mockUser.username && password === mockUser.password) ? mockUser : null;
}



const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // ดึง token ออกมา

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

// Sample route ddd
app.get('/Hello', (req, res) => {
  res.send('Hello World!'+req.ip);
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/swagger`);
});
