import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';

export default ({logoStyle, logoTextStyle}) => (
  <View style={[styles.logo, logoStyle]}>
    <Text style={[styles.text, logoTextStyle]}>CONVOS</Text>
  </View>
);