import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import {ChatBot } from '../components/ChatBot';
import uuid from 'react-native-uuid';
import {NAMMA_AIRPORT_SERVER} from '@env';
import axios from 'axios';

export function ChatScreen ({ navigation, userInfo }) {
    const [messages, setMessages] = useState([]);
    const [isNewConversation, serNewConversation] = useState(true);

    var botComposeInitialMessage = {
        _id: uuid.v4(),
        text: 'Hello '+userInfo.user.givenName+', How can i help you today?',
        createdAt: new Date(),
        user: {
            _id: 'bot',
            name: 'Namma Airport Bot',
            avatar: require('../../assets/bot.jpg'),
        }
    }
    
    const onLoadEarlier = async()=>{
        axios.get(NAMMA_AIRPORT_SERVER+'messages/'+userInfo.user.email)
        .then(response => {
            let tempMessages = response.data.reverse();
            //console.log(response.data)
            setMessages(tempMessages);
        })
        .catch(err =>{
            console.log(err);
        });
    }
    
    useEffect(() => {
        if(isNewConversation){ 
            //console.log(botComposeInitialMessage);
            //console.log(typeof messages)
            //messages.push([botComposeInitialMessage]);
            setMessages([
                botComposeInitialMessage
            ])
        }
    }, []);

    const onSend = useCallback((messages = []) => {
        var config = {
            method: 'post',
            url: NAMMA_AIRPORT_SERVER+'messages/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({...messages[0], email: userInfo.user.email})
        };
        axios(config)
        .then(response => { 
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        })
        .catch(err =>{
            console.log(err);
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        });
    }, []);

    return (
        <ChatBot
            messages={messages}
            isTyping={true}
            onSend={messages => onSend(messages)}
            scrollToBottom={true}
            loadEarlier={true}
            onLoadEarlier={()=>{onLoadEarlier()}}
            user={{
                _id: 'user',
                name: userInfo.user.name,
                avatar: userInfo.user.photo,
            }}
        />
    );
}
const styles = StyleSheet.create({
});
