import JWT from "jsonwebtoken";


const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token =     authHeader && authHeader.split(" ")[1];

        if(!token){
            return res.status(403).json({message: "Access denied  No token provided."});
        }

        const verified = JWT.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid Token"})
        console.error("Invalid Token: " + error.message);
    }
};

export default authenticateToken;