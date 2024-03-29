import React from 'react';
import {
  Appearance,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import StorytellerContext from './context/StorytellerContext';
import VerticalVideoLists from './components/VerticalVideoLists';
import AmplitudeContext from './context/AmplitudeContext';

function App() {
  return (
    <AmplitudeContext>
      <StorytellerContext>
        <SafeAreaView style={getContainerStyle(isDarkMode)}>
          <View>
            <View style={[styles.appBar]}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[getAppTitleStyle(isDarkMode)]}>Storyteller</Text>
              </View>
            </View>
          </View>
          <VerticalVideoLists />
        </SafeAreaView>
      </StorytellerContext>
    </AmplitudeContext>
  );
}

function getAppTitleStyle(isDark: Boolean): StyleProp<TextStyle> {
  return [
    styles.appTitle,
    {
      color: isDark ? 'white' : 'black',
    },
  ];
}

function getContainerStyle(isDark: Boolean): StyleProp<ViewStyle> {
  return [styles.container, {backgroundColor: isDark ? '#333333' : 'white'}];
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  appTitle: {
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appTitleContainer: {
    flexDirection: 'row',
  },
  appBar: {
    marginBottom: 8,
    height: 54,
    justifyContent: 'center',
  },
});

const isDarkMode = Appearance.getColorScheme() === 'dark';

export default App;
