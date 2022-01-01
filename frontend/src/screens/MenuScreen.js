import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View,Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Theme from '../constants/Theme';
import Dim from '../constants/Dimensions';
export function MenuScreen({userInfo}){
  const [personalizedRec,setPersonalizedRec] = useState(true);
  const [ticketRec,setTicketRec] = useState(true);
  const [locationRec,setLocationRec] = useState(true);
  const [pushNotif,setPushNotif] = useState(true);
  const [emailNotification,setEmailNotification] = useState(true);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
  }, []);

  return (
    <BottomSheetModalProvider>
    <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.userImageView}>
            <Image source={{uri : userInfo.user.photo}} style={styles.userImage} />
          </View>
          <Text style={styles.userProfileText}>{userInfo.user.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.preferencesButton}
          onPress={()=>handlePresentModalPress()}
        >
          <Text style={styles.preferencesButtonText}>YOUR PREFERENCES</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.preferencesButtonText}> PREFERENCES LIST</Text>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxView}>
                <CheckBox
                  value={personalizedRec}
                  onValueChange={setPersonalizedRec}
                  style={styles.checkbox}
                />
                <View style={styles.checkboxTextView}>
                <Text style={styles.label}>Personalized recommendations</Text>
                </View>
              </View>

              <View style={styles.checkboxView}>
                <CheckBox
                  value={ticketRec}
                  onValueChange={setTicketRec}
                  style={styles.checkbox}
                />
                
                <View style={styles.checkboxTextView}>
                <Text style={styles.label}>Ticket-based lounge recommendation</Text>
                </View>
              </View>

              <View style={styles.checkboxView}>
                <CheckBox
                  value={locationRec}
                  onValueChange={setLocationRec}
                  style={styles.checkbox}
                />
                <View style={styles.checkboxTextView}>
                <Text style={styles.label}>Location-based transport recommendation</Text>
                </View>
              </View>

              <View style={styles.checkboxView}>
                <CheckBox
                  value={pushNotif}
                  onValueChange={setPushNotif}
                  style={styles.checkbox}
                />
                <View style={styles.checkboxTextView}>
                <Text style={styles.label}>App push notification</Text>
                </View>
              </View>

              <View style={styles.checkboxView}>
                <CheckBox
                  value={emailNotification}
                  onValueChange={setEmailNotification}
                  style={styles.checkbox}
                />
                <View style={styles.checkboxTextView}>
                <Text style={styles.label}>Email notification</Text>
                </View>
              </View>
            </View>
            
          </View>
        </BottomSheetModal>
      </View>
      </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ddd',
  },
  profileContainer:{
    flex: 0.6,
    marginVertical: 30,
    marginHorizontal: 15,
    alignItems: 'center'
  },
  userImageView: {
    borderRadius: 1000,
    elevation: 15,
  },
  userImage: {
    borderRadius: 1000,
    width: 300,
    height: 300,
  },
  userProfileText:{
    marginTop: 20,
    fontFamily: 'Lato-BoldItalic',
    fontSize: 30,
    color: Theme.mainColour,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  preferencesButton:{
    fontFamily: 'Lato-BoldItalic',
    borderRadius: 20,
    height: 30,
    backgroundColor: '#eee',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  preferencesButtonText:{
    fontFamily: 'Lato-Bold',
    fontSize: 17,
    color: Theme.mainColour,
  },
  checkboxView: {
    width: Dim.WindowWidth-40,
    marginHorizontal: 20,
    backgroundColor: '#eee',
    flexDirection: "row",
    marginTop: 20,
    borderRadius: 5,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    fontFamily: 'Lato-Italic',
    fontSize: 20,
    color: 'black',
    margin: 8,
  },
  checkboxTextView:{
    flexShrink: 1,
  }
});
