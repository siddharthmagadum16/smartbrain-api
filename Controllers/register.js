

const RegisterHandler=(req,res,db,bcrypt)=> {
    const {email,name,password } = req.body
    // bcrypt.hash(password, null, null, function(err, hash)) type check 
    if(!email || !name || !password){
        return res.status(400).json("Not entered valid credentials");
    }
    const hash= bcrypt.hashSync(password);
        db.transaction(trx=>{
        trx.insert({
            hash: hash,  
            email: email    // email and paswd hash from the body (entered)
        })
      
        .into('login') // log2 base2 
        .returning('email')
        .then(loginEmail=>{
            return trx('users') 
            .returning('*')
            .insert({                       //this is test recording 
                name : name,
                email : loginEmail[0],  
                joined : new Date()
            })
            .then(user=> {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json("unable to register"))
}

module.exports={
    RegisterHandler : RegisterHandler
}