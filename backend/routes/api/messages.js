const express = require("express");
const router = express.Router();
const path = require('path');
const axios = require('axios');
const uuid = require('uuid');
const config = require('config');
const Message = require(path.join(__dirname,'..','..', 'models','MessageData'));

const botEndpoint = config.get('BotEndpoint');
const botEndpointAuth = config.get('BotEndpointAuth');
const luisPredictionEndpoint = config.get('AzureLuisPredictionEndpoint');

function generateBotReplyForAnswer(answer, requestBody){
    var botReply = {
        text: answer,
        createdAt: new Date().toISOString(),
        user:{
            _id: "bot",
            name: "Namma Airport Bot",
            avatar: "https://nammaairportstorage.blob.core.windows.net/namma-airport/bot.jpg",
        },
        email: requestBody.email,
        _id: uuid.v4()
    };
    return botReply;
}

function generateLuisReplyForAnswer(answer, requestBody){
    var botReply = {
        text: answer,
        createdAt: new Date().toISOString(),
        user:{
            _id: "bot",
            name: "Namma Airport Bot",
            avatar: "https://nammaairportstorage.blob.core.windows.net/namma-airport/bot.jpg",
        },
        email: requestBody.email,
        _id: uuid.v4()
    };
    return botReply;
}

async function fetchBotResponse(question){
    var data = JSON.stringify({
        "question": question
    });
    var config = {
        method: 'post',
        url: botEndpoint,
        headers: { 
          'Authorization': botEndpointAuth, 
          'Content-Type': 'application/json',
        },
        data : data
    };
    var response = await axios(config);
    try{
        return response.data;
    }catch{
        return null;
    }
}

async function fetchLuisResponse(question){
    var data = JSON.stringify({
        "query": question
    });
    var config = {
        method: 'post',
        url: luisPredictionEndpoint,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    var response = await axios(config);
    try{
        return response.data;
    }catch{
        return null;
    }
}

async function orchestrateAnswer(question, requestBody){
    const botResponse = await fetchBotResponse(question);
    const luisResponse = await fetchLuisResponse(question);

    const botScore = botResponse.answers[0].score;
    const luisTopIntent = luisResponse.prediction.topIntent;
    if(luisTopIntent!=="None"){
        const luisScore = luisResponse.prediction.intents[luisTopIntent].score;
        if(luisScore*100>botScore){
            return "Luis Response"
        }else{
            return "Bot Response"
        }
    }else{
        return "Bot Response"
    }
}

async function fetchAnswer(question, requestBody){
    var data = JSON.stringify({
        "question": question
    });
    var config = {
        method: 'post',
        url: botEndpoint,
        headers: { 
          'Authorization': botEndpointAuth, 
          'Content-Type': 'application/json',
        },
        data : data
    };
    var response = await axios(config);
    try{
        console.log(response.data)
        return generateBotReplyForAnswer(response.data.answers[0].answer, requestBody);
    }catch{
        return null;
    }
}


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

router.post('/',async (req,res)=>{
    var question = req.body.text;
    var botReply = await fetchAnswer(question, req.body);
    var userMessage = new Message(req.body);
    var botMessage = new Message(botReply);
    Message.insertMany([userMessage, botMessage])
    .then(()=>{  
        res.json(botMessage);
    })
    .catch((err)=>{
        res.sendStatus(400);
    })
})

router.post('/test',async (req,res)=>{
    var question = req.body.text;
    orchestrateAnswer(question)
    .then(response=>{
        res.json({"reply from": response});
    })
    .catch(err=>{
        res.sendStatus(400);
    })
    
})


module.exports = router;