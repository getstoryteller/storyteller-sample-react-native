import React from 'react';
import {Appearance, SafeAreaView, ScrollView, StatusBar} from 'react-native';

import Storyteller from '@getstoryteller/react-native-storyteller-sdk';
Storyteller.getConstants();

import {Colors} from 'react-native/Libraries/NewAppScreen';
import StorytellerContext from './context/StorytellerContext';
import VerticalVideoLists from './components/VerticalVideoLists';

class App extends React.Component<any, any> {
  render() {
    return (
      <StorytellerContext>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <VerticalVideoLists />
          </ScrollView>
        </SafeAreaView>
      </StorytellerContext>
    );
  }
}

const isDarkMode = Appearance.getColorScheme() === 'dark';

const backgroundStyle = {
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  flex: 1,
};

export default App;
