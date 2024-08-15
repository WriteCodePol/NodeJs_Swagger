## สร้างไฟล์ package.json และเพิ่ม  "start": "node index.js" ภายใต้ scripts
# npm init -y

## ติดตั้ง Express และ Swagger UI
# npm install express swagger-ui-express


## ติดตั้ง Express และ body-parser ซึ่งจะใช้ในการจัดการข้อมูลในรูปแบบ JSON
# npm install express body-parser

## คุณต้องติดตั้ง express, swagger-ui-express, และ swagger-jsdoc ด้วยคำสั่ง:
# npm install express swagger-ui-express swagger-jsdoc

## URL สำหรับเข้า Swagger
[localhost:3000/](http://localhost:3000/api-docs/)

# npm install swagger-autogen


## สร้างไฟล์ index.js 
const express = require('express');
const swaggerSetup = require('./swagger');

const app = express();
const port = 3000;

swaggerSetup(app);


// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


## สร้างไฟ Swagger.js Swagger ไว้ใน Folder หลัก 
// const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');

// const outputFile = './swagger_output.json';
// const outputFile = './swagger_vercel.json';

const endpointsFiles = ['./index.js']; // แก้ไขตามไฟล์เส้นทาง API ของคุณ

// สร้าง Swagger JSON จากไฟล์ API
// swaggerAutogen(outputFile, endpointsFiles);

// เรียกใช้ Swagger JSON ที่สร้างไว้
const swaggerFile = require('./swagger_output.json');
// const swaggerFile = require('./swagger_vercel.json');
// ใช้ Swagger UI เพื่อเปิดหน้า UI สำหรับดู API Documentation


module.exports = (app) => {
    app.use('/swagger', swaggerUi.serve);
    
    app.get('/swagger', swaggerUi.setup(swaggerFile));
  };