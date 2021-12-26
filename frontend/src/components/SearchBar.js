import React, { FunctionComponent } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBarWithAutocomplete(props) {
  const {
    value,
    style,
    onChangeText
  } = props
  
  const {
    container,
    inputStyle
  } = styles
  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style
return (
    <View style={[container, { ...passedStyles }]}>
      <TextInput
        style={inputStyle}
        placeholder='Search places within the airport'
        placeholderTextColor='gray'
        value={value}
        onChangeText={onChangeText}
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
    color: 'black',
    fontSize: 16,
  }
})
export default SearchBarWithAutocomplete