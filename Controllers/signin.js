

const SigninHandler=(db,bcrypt)=>(req,res)=>{
    const { email, password }= req.body
    if(!email || !password){
        return res.status(400).json("Invalid Credentials entered");
    }
    // const {email,password } = req.body;
    db.select('email','hash').from('login')
        .where('email','=',email)
        // console.log(email)
        .then(data=>{
            const isValid= bcrypt.compareSync(password,data[0].hash); 
            // console.log(isValid);
            if(isValid){
                return db.select('*').from('users')
                    .where('email','=',email)
                    .then(user=> res.json(user[0]))
                    .catch(err=> res.status(400).json("Unable to send user credentials"))
            }
            else    res.status(400).json("Unable to Signin");
        }) //PAUSE
        .catch(err=> res.status(400).json("Error while Signing in"));
}

module.exports={
    SigninHandler : SigninHandler
}