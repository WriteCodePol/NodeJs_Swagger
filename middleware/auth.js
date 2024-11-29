const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

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



router.post('/method1', async (req, res) => {
    const { name } = req.body;

    res.status(200).json({ body : req.body , msg: 'method1' });
    
});


router.post('/gettoken', (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบผู้ใช้จากฐานข้อมูล (ตัวอย่างนี้ใช้ข้อมูลจำลอง)
  const user = getUserFromDatabase(username, password); // ฟังก์ชันนี้ควรตรวจสอบในฐานข้อมูลจริง

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // สร้าง token
  const token = jwt.sign({ userId: user.username }, SECRET_KEY, { expiresIn: '1h' });
//   const apiName = req.path;
//   const clientIp = req.ip;
//   const domain = req.hostname;
  res.json({ token });
});

router.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

// ตัวอย่างฟังก์ชันตรวจสอบผู้ใช้
function getUserFromDatabase(username, password) {
  // จำลองการตรวจสอบผู้ใช้
  const mockUser = { username: 'admin', password: '1234' }; // ข้อมูลผู้ใช้จริง
  return (username === mockUser.username && password === mockUser.password) ? mockUser : null;
}
module.exports = router;