import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBarWithAutocomplete(props) {
  const {
    value,
    style,
    onChangeText,
    onSubmitEditing
  } = props
  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style
return (
    <View style={[styles.container, { ...passedStyles }]}>
      <TextInput
        style={styles.inputStyle}
        placeholder='Search places within the airport'
        placeholderTextColor='gray'
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType='search'
      />
      {/* <FontAwesomeIcon icon={ faSearch } size={28} color={ 'black'} /> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  inputStyle: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
    elevation: 3
  }
})
export default SearchBarWithAutocomplete