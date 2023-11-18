const jwt = require("jsonwebtoken");

const fetchUserIDMiddleware = (req, res, next) => {
  const loginToken = req.headers.token;
  if (!loginToken) {
    return res.status(401).json({ status: "failed", message: "Unauthorized" });
  }

  try{
    const verifyToken = jwt.verify(loginToken,process.env.JWT_SECRET);
    req.user_id = verifyToken._id
    next();

  }catch(err){
    console.log(err)
    return res.status(401).json({ status: "failed", message: "Invalid token" });
  }
};

module.exports = fetchUserIDMiddleware;
