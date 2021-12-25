const express = require("express");
const router = express.Router();
const path = require('path');
const axios = require('axios');
const uuid = require('uuid');
const config = require('config');
const Message = require(path.join(__dirname,'..','..', 'models','MessageData'));

const botEndpoint = config.get('BotEndpoint');
const botEndpointAuth = config.get('BotEndpointAuth');

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


module.exports = router;