import jwt from 'jsonwebtoken';

export const authenticate=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(400).json({success:false,message:"please first login"});
    }
    const tokenParts=authHeader.split(' ');
    if(tokenParts.length!==2 || tokenParts[0].toLowerCase()!=='bearer'){
        return res.status(400).json({success:false,message:"Invalid Authorization header format"});
    }
    const token=tokenParts[1];
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.id=decode.id;
    req.role=decode.role;
    next();
}
export const authorize=(req,res,next)=>{
    const role=req.role;
    if(role!=='admin'){
        return res.status(400).json({success:false,message:"unauthorize user"});
    }
    next();
}