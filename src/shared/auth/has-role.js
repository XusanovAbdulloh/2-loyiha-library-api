const jwt = require("jsonwebtoken")
const isSuperAdmin = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token kelmadi' });
  }

  try {
    const decodedToken = jwt.verify(token, 'hey');
    if (!decodedToken.isSuperAdmin === true) {
      return res.status(403).json({ message: 'Faqat super adminlarga ruxsat berilgan' });
    }
    req.adminId = decodedToken.adminId; 
    next(); 
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Noto\'g\'ri yoki amal qilmas token' });
  }
};



module.exports = { isSuperAdmin };
