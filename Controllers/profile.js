const ProfileHandlerget =(req,res,db)=>{
    const { id } = req.params;
    db.select('*').from('users').where({id})
        // .returning('*')
        .then(user=>{
            console.log(user[0]);
            if(user.length){
                res.json(user[0]);
            }
            else res.status(400).json("User not found");
        })
        .catch(err=> res.status(400).json("failed to display profile"));
        
    
}

module.exports={
    ProfileHandlerget
}