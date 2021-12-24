const express = require("express");
const router = express.Router();
const path = require('path');


const User = require(path.join(__dirname,'..','..', 'models','UserData'));

router.get('/:email',(req,res)=>{
    const email = req.params.email;
    User.find({email: email})
    .then((object)=>{
        if(object.length>0){
            res.json(object[0]);
        }else{
            res.sendStatus(400);
        }
    })
    .catch((err)=>{
        res.sendStatus(400).json(err);
    })
})

router.post('/',(req,res)=>{
    var userId = req.body.userId;
    var email = req.body.email;
    var fullName = req.body.fullName;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var photoUri = req.body.photoUri;
    console.log(email);
    User.find({email: email})
    .then((object)=>{
        const query = { email: email };
        const update = { $set: { userId: userId, email: email, fullName: fullName, firstName: firstName, lastName: lastName, photoUri: photoUri}};
        const options = { upsert: true };
        User.updateOne(query, update, options)
        .then((doc)=>{
            res.sendStatus(200);
        })
        .catch((err)=>{
            res.sendStatus(400);
        })  
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

router.delete('/:email',(req,res)=>{
    const email = req.params.email;
    User.deleteMany({email: email})
    .then((doc)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

module.exports = router;