const express = require("express");
const router = express.Router();
const path = require('path');
const axios = require('axios');
const config = require('config');


const Search = require(path.join(__dirname,'..','..', 'models','SearchData'));
const azureMapsEndpointKey = config.get('AzureMapsKey');
const mapSearchHost = config.get("AzureMapsSearchHost");

router.post('/',(req,res)=>{
    const email = req.body.email;
    const search = req.body.search;
    
    var mapSearchUri = mapSearchHost+"?subscription-key="+azureMapsEndpointKey+"&api-version=1.0&query="+search+"&lat=13.198623625191303&lon=77.70503811186883&radius=2000";
    var reqConfig = {
        method: 'get',
        url: mapSearchUri,
        headers: { }
    };
    axios(reqConfig)
    .then(response=>{
        var result = response.data.results;
        var returnRes = [];
        const categories = new Set();
        result.forEach(obj=>{
            returnRes.push({name: obj.poi.name, position: obj.position});
            obj.poi.categories.forEach(category=>{
                categories.add(category);
            })
        })

        var categoriesArray = Array.from(categories);
        if(categoriesArray.length>0){
            var doc = new Search({email: email, search: categoriesArray})
            Search.insertMany([doc])
            .then(()=>{
            })
            .catch((err)=>{
                //console.log(err);
            })
        }
        res.json(returnRes);
    })
    .catch(err=>{
        //console.log(err);
        res.sendStatus(400);
    })
})

router.get('/crowd',(req,res)=>{
    // random airport crowd generating endpoint, to be modified with actual iot data from the airport (to be implemented)
    var population = Math.floor((Math.random() * 3000) + 500);
    res.json({crowd: population});
})

module.exports = router;