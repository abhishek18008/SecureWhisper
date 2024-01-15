import jwt from 'jsonwebtoken'

const auth=async(req,res,next)=>{
    try {
        console.log("the req body obj is",req.body);
        console.log("the req headers obj is",req.headers);
        
        const token=req.headers.authorization.split(' ')[1];
        if(token){
            const decodedData=jwt.verify(token,'test');
            req.userId=decodedData?.id;
        }
        console.log(req.userId);
        next();
    } catch (error) {
        console.log(error);
    }
}


export default auth;