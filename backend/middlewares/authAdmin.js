import jwt from "jsonwebtoken"

const authadmin=async (req,res,next) => {

    
     try {
        
      const {atoken}=req.headers

      if(!atoken){
         return res.json({
          success:false,
          message:'Not Authorized Login Again'
         })
      }

      const decode_token=jwt.verify(atoken,process.env.JWT_KEY);

      if(decode_token!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        res.status(400).json({
            success:false,
            message:"invalid admin authentication"
        })
      }

      next();

        
     } catch (e) {
         console.log(e);

         res.json({
            status:false,
            message:e.message

         })
        
     }
}

export default authadmin;