/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Nav from './src/Navigation/index';
import Loader from './src/component/loader';
import {StoreProvider} from './src/context/store';

const App =() => {
  return (
<StoreProvider>
<Nav/>  
<Loader/>
</StoreProvider>

    
  );
};


export default App;
