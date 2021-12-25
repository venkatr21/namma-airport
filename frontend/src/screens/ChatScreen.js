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
    
    
    const onLoadEarlier = async()=>{
        console.log(NAMMA_AIRPORT_SERVER+'messages/'+userInfo.user.email)
        axios.get('http://2f59-183-82-26-168.ngrok.io/messages/'+userInfo.user.email)
        .then(response => {
            try{
            setMessages(response.data);
            }catch{

            }
        })
        .catch(err =>{
            console.log(err);
            //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        });
    }

    useEffect(() => {
        setMessages([
            {
                _id: uuid.v4(),
                text: 'Hello '+userInfo.user.givenName+', How can i help you today?',
                createdAt: new Date(),
                user: {
                    _id: 'bot',
                    name: 'React Native',
                    avatar: require('../../assets/bot.jpg'),
                }
            }
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        axios.post(NAMMA_AIRPORT_SERVER+'messages/', JSON.stringify({...messages[0], email: userInfo.user.email}))
        .then(response => {
            return response.json();
        })
        .then(json=>{
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
            console.log(json);
        })
        .catch(err =>{
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
                _id: 1,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            }}
        />
    );
}
const styles = StyleSheet.create({
});
