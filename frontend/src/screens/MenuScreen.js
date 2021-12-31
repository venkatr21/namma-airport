import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { View,Text, Image, StyleSheet, Button, Touchable } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Dim from '../constants/Dimensions';
import Theme from '../constants/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function MenuScreen({userInfo}){
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
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
          animationConfigs={{
            point: 2,
          }}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.preferencesButtonText}> PREFERENCES LIST</Text>
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
  }
});
