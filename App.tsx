/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Main from './src/Main';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar hidden />
      <Main />
    </SafeAreaView>
  );
}

export default App;
