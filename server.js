const express=require('express');
const { report } = require('process');
const bcrypt=require('bcrypt-nodejs');
const app=express();
const cors=require('cors');
var knex = require('knex');

const register=require('./Controllers/register');
const signin=require('./Controllers/signin');
const profile=require('./Controllers/profile');
const image=require('./Controllers/image');

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'arijitsing',
      database : 'smartbrain'
    }
});

// postgres.select('*').from('users');


app.use(express.json()); // REMEMBER that the  these 2 lines should be below database atherwise the program dosen't find and server on this host
app.use(cors()) 

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin', signin.SigninHandler(db,bcrypt)) //(req,res)=> { signin.SigninHandler(req,res,db,bcrypt) })

app.post('/register',(req,res)=>{  register.RegisterHandler(req,res,db,bcrypt) }) // if you send app.post('/register',(req,res,db,bcrypt)=>...) you will get an 404 error saying register not found

app.get('/profile/:id',(req,res)=>{ profiles.ProfileHandlerget(req,res,db) })

app.put('/image',(req,res)=>{ image.ImageHandler(req,res,db) } )
app.post('/image',(req,res)=>{ image.ApiCallHandler(req,res) } )

app.listen(process.env.PORT || 3000,()=>{
    console.log(`App is running on port ${process.env.port}`); 
})

/*

bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.2
        console.log(hash);
});
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/


/*
/                   ->res=this is working
/signin             -> POST = successful/fail
/register           -> user
/profile/userid     ->GET=user
/image              ->PUT=user

*/

// npm install bcrypt-nodejs