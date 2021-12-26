import React, { useEffect, useCallback, useState } from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import { TabBar } from '../components/TabBar';
import SearchBarWithAutocomplete from '../components/SearchBar';
export function HomeScreen({userInfo}) {
  const [search, setSearch] = useState({ term: '' })
  return (
    <View style={styles.container}>
        <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        <TabBar displayText={"Home"} />
        <View style={{flex: 0.9, justifyContent: 'center'}}>
        <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={(text) => setSearch({ term: text })}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});