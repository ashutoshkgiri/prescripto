
import jwt from 'jsonwebtoken'


const authDoctor=async (req,res,next) => {
     
    try {

        const  {dtoken}=req.headers;

        if(!dtoken){
           res.json({
                success:false,
                message:'Not Authorized Login Again'
           })
        }
   
        const check=jwt.verify(dtoken,process.env.JWT_KEY);
   
        req.body.docId=check.id;
   
        next();
        
    } catch (error) {

        res.json({
            success:false,
            message:error.message
        })
        
    }

    
}

export default authDoctor;