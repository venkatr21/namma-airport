const express = require("express");
const router = express.Router();
const path = require('path');


const Poi = require(path.join(__dirname,'..','..', 'models','Poi'));

router.get('/',(req,res)=>{
    Poi.find({})
    .then((object)=>{
        if(object.length>0){
            res.json(object);
        }else{
            res.sendStatus(400);
        }
    })
    .catch((err)=>{
        res.sendStatus(400).json(err);
    })
})

router.get('/:name',(req,res)=>{
    const name = req.params.name;
    Poi.find({name: name})
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
    if(req.body.length>0){
        Poi.insertMany(req.body)
        .then((doc)=>{
            res.sendStatus(200);
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        }) 
    }else{
        res.sendStatus(200);
    }
    
})

router.delete('/',(req,res)=>{
    Poi.deleteMany({})
    .then((doc)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

router.delete('/:name',(req,res)=>{
    const name = req.params.name;
    Poi.deleteMany({name: name})
    .then((doc)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

router.get('/recommendation/:email',(req,res)=>{
    const email = req.params.email;
    Poi.find({})
    .then((object)=>{
        if(object.length>4){
            res.json(object.sort(() => Math.random() - Math.random()).slice(0, 4));
        }else{
            res.json(object);
        }
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

module.exports = router;