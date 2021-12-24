import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import {ChatBot } from '../components/ChatBot';
import uuid from 'react-native-uuid';


export function ChatScreen ({ navigation, userInfo }) {
    const [messages, setMessages] = useState([]);
    
    
    const onLoadEarlier = async()=>{
        console.log(userInfo.user);
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
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
