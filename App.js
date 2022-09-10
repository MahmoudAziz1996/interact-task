import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from './src/assets/theme/colors';
import HomeScreen from './src/screens/Home';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
