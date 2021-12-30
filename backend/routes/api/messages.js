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

function generateLuisReplyForAnswer(luisResponse, requestBody){
    var quickReply = ""
    for (let [key, value] of Object.entries(luisResponse.prediction.entities)) {
        quickReply+=(key.split(".")[1]+": "+value[0]+"\n");
    };
    if(quickReply.length>0){
        return {
            text: "I was able to understand this from your query!",
            createdAt: new Date().toISOString(),
            user:{
                _id: "bot",
                name: "Namma Airport Bot",
                avatar: "https://nammaairportstorage.blob.core.windows.net/namma-airport/bot.jpg",
            },
            email: requestBody.email,
            _id: uuid.v4(),
            quickReplies: {
                type: 'checkbox',
                keepIt: true,
                values: [
                    {
                        title: quickReply,
                        value: quickReply
                    }
                ]
            }
        }
    }
    else{
        return {
            text: "Sorry, I was unable to parse your query, can you please refine your search?",
            createdAt: new Date().toISOString(),
            user:{
                _id: "bot",
                name: "Namma Airport Bot",
                avatar: "https://nammaairportstorage.blob.core.windows.net/namma-airport/bot.jpg",
            },
            email: requestBody.email,
            _id: uuid.v4()
        }
    }
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
            return generateLuisReplyForAnswer(luisResponse, requestBody);
        }else{
            return generateBotReplyForAnswer(botResponse.answers[0].answer, requestBody);
        }
    }else{
        return generateBotReplyForAnswer(botResponse.answers[0].answer, requestBody);
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
    orchestrateAnswer(question, req.body)
    .then(response=>{
        var userMessage = new Message(req.body);
        var botMessage = new Message(response);
        // Message.insertMany([userMessage, botMessage])
        // .then(()=>{  
        //     res.json(botMessage);
        // })
        // .catch((err)=>{
        //     console.log(err);
        //     res.sendStatus(400);
        // })
        res.json(botMessage);
    })
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    })
    
})


module.exports = router;