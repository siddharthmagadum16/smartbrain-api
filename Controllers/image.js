const clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e6958cb4b7d040e7855ea77c36b510ab'
});

const ApiCallHandler= (req,res)=>{
    app.models
        .predict('c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
        .then(data=> res.json(data))
        .then(console.log);
        .catch(err => res.status(400).json(`Unable to detect face${err}`))

}

const ImageHandler =(req,res,db)=>{
    const { id: id } = req.body;
    db('users').where({id})
    db('users')
        .where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries=> res.json(entries[0]))
        .catch(err=> res.json(`unable to get entries:${err}`))
}

module.exports={
    ImageHandler, ApiCallHandler
}
// e6958cb4b7d040e7855ea77c36b510ab