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
    Poi.insertMany(req.body)
    .then((doc)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(400);
    }) 
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

module.exports = router;