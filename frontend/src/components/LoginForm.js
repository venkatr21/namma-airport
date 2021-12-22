import React, {useState} from 'react';
import Theme from '../constants/Theme';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import FormButton from './FormButton';
import FormInput from './FormInput';
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Namma Airport</Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Sign In"
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
        </>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: Theme.mainColour,
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: Theme.mainColour,
      fontFamily: 'Lato-Regular',
    },
  });