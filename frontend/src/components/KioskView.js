import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Dim from '../constants/Dimensions';
import Theme from '../constants/Theme';
import FormInput from './FormInput';

import Icon from 'react-native-vector-icons/MaterialIcons';
export function KioskView({}) {
    const [email, setEmail] = useState("")
    return (
        <View style={styles.kioskView}>
            <View style={styles.kioskInput}>
                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText="Enter booking Id for E-Checkin"
                    iconType="search1"
                    autoCorrect={false}
                />
            </View>
            <TouchableOpacity style={styles.kioskScanner}>  
                <Icon name={'qr-code'} size={50} color={'grey'}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({  
    kioskView:{
        width: Dim.WindowWidth-20,
        marginLeft: 10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    kioskInput:{
        width: '85%',
    },
    kioskScanner:{
        marginTop: 5,
        height: Dim.WindowHeight/15,
        borderRadius: 5,
        marginLeft: 10,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
});