


function authorize(roles) {
    return (req, res, next) => {
      if (req.roles && req.roles.role === roles) {
        next(); // User has the required role, proceed to the next middleware or route handler
      } else {
        res.status(403).json({ error: 'Unauthorized, please login ' 
      }); // User does not have the required role, send a 403 Forbidden response
      }
    };
  }

  const authComman = (req,res,next)=>{
    if(req.user) {
    
     console.log("user exist");
    } else if(req.admin) {
     
     console.log("admin exist");
    }

   else {
       req.guest = {
        role: "guest" ,
        ip: req.ip
       }
       console.log("guest exist");
      }
      next();
  }




let checkuser = (req,res,next)=>{
  if(req.user){
      next();
  } else {
      res.send({message: "please login again" , value: false })
  }
}
let verifyAdmin = (req,res,next)=>{
  if(req.admin){
      next();
  } else {
      res.send({message: "please login again" , value: false })
  }
}

  module.exports = {
    authorize , authComman  , checkuser , verifyAdmin
  }
  