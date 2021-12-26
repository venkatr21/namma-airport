import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet,StatusBar, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {ChatBot } from '../components/ChatBot';
import { TabBar } from '../components/TabBar';
import uuid from 'react-native-uuid';
import {NAMMA_AIRPORT_SERVER} from '@env';
import axios from 'axios';
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export function ChatScreen ({ navigation, userInfo }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
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
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        setIsTyping(true);
        axios(config)
        .then(response => { 
            setMessages(previousMessages => GiftedChat.append(previousMessages, response.data));
            //console.log(response.data);
            setIsTyping(false);
        })
        .catch(err =>{
            console.log(err);
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        });
    }, []);

    return (
        <View style={[styles.container]}>
            <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
            <TabBar displayText={"Help & Support"} />
            <ChatBot
                messages={messages}
                isTyping={isTyping}
                onSend={messages => onSend(messages)}
                scrollToBottom={true}
                loadEarlier={true}
                onLoadEarlier={()=>{onLoadEarlier()}}
                textInputStyle={{  color: 'black' }}
                user={{
                    _id: 'user',
                    name: userInfo.user.name,
                    avatar: userInfo.user.photo,
                }}
            />
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});