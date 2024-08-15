const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const outputFile = './config/swg_doc/swagger_doc.json';
const backupFile = './config/swg_doc/swagger_doc_bk.json';
const endpointsFiles = [path.resolve(__dirname, './index.js')]; // Adjust the path to your API files

//============ สร้าง Swagger JSON จากไฟล์ API + BackUpFilegd ============
if (process.env.GEN_SWAGGER_FLAG == 1) {
  try {
    // Backup old file
    fs.copyFileSync(outputFile, backupFile);
    console.log('File copied successfully');
  } catch (err) {
    console.error('Error copying file:', err);
  }

  const swaggerAutogen = require('swagger-autogen')();
  swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('Swagger JSON generated successfully');
  }).catch(err => {
    console.error('Error generating Swagger JSON:', err);
  });
}

// Use Swagger JSON with Swagger UI
const swaggerFile = require(outputFile);

module.exports = (app) => {
  app.use('/swagger', swaggerUi.serve);
  app.get('/swagger', swaggerUi.setup(swaggerFile));
};
