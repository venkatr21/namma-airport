const { text } = require("body-parser");
const express = require("express");
const router = express.Router();
const path = require('path');


const Message = require(path.join(__dirname,'..','..', 'models','MessageData'));

router.get('/:email',(req,res)=>{
    const email = req.params.email;
    Message.find({email: email})
    .then((object)=>{
        res.json(object);
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

router.post('/',(req,res)=>{
    var doc = new Message(req.body);
    Message.insertMany(doc)
    .then(()=>{  
        res.sendStatus(200);
    })
    .catch(()=>{
        res.sendStatus(400);
    })
})


module.exports = router;