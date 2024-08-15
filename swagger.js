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