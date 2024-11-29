// กำหนด whitelist ของเว็บไซต์ที่อนุญาต
const whitelist = [
    'https://appsonofodin.vercel.app'
    ,'https://apisonofodin.vercel.app'
    ,'https://my-apptestpol.vercel.app'
    ,'https://apisonofodin.vercel.app/swagger'
    ,'https://hugin-raven.vercel.app'
    ,'https://apisonofodin.vercel.app'];
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
     
          callback(null, true); // อนุญาตให้เข้าถึง
       
      } else {
        callback(new Error('Not allowed by CORS')); // ปฏิเสธการเข้าถึง
      }
    },
    optionsSuccessStatus: 200
  };
  
  

// Middleware สำหรับจัดการข้อผิดพลาด CORS
function HideMsgError(err, req, res, next) {
    if (res && res.headersSent) {
        return next(err);
    }
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'Not allowed by CORS' });
    } else {
        return next();
    }
}

module.exports = {
    corsOptions,
    HideMsgError
};

