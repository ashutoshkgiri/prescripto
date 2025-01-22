import jwt from "jsonwebtoken"

const authUser=async (req,res,next) => {

    
     try {
        
      const {token}=req.headers

      if(!token){
         return res.json({
          success:false,
          message:'Not Authorized Login Again'
         })
      }

      const decode_token=jwt.verify(token,process.env.JWT_KEY);

     req.body.userId=decode_token.id;

      next();

        
     } catch (e) {
         console.log(e);

         res.json({
            status:false,
            message:e.message

         })
        
     }
}

export default authUser;