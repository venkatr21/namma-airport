import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Dim from '../constants/Dimensions';

export function MenuScreen(){
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Edit your details"
          color="black"
        />
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
          </View>
        </BottomSheetModal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
