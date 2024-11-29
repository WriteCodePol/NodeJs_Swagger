const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// const sql = require('mssql');
// const { Pool } = require('pg');




// Sample route ddd
router.get('/Hello', (req, res) => {
    res.send('Hello World!'+req.ip);
  });
  
  
router.post('/method1', async (req, res) => {
    const { name } = req.body;

    res.status(200).json({ body : req.body , msg: 'method1' });
    
});



module.exports = router;