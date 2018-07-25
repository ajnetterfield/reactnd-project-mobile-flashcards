import React from 'react';
import { Constants } from 'expo';
import { StatusBar, View } from 'react-native';

const ConfigurableStatusBar = (props) => (
  <View style={{ backgroundColor: props.backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent {...props} />
  </View>
);

export default ConfigurableStatusBar;
