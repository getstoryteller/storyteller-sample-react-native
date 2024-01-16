/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Storyteller, { StorytellerStoriesRowView } from '@getstoryteller/react-native-storyteller-sdk';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const storytellerApiKey = "[API-KEY]";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isStorytellerInitialized, setIsStorytellerInitialized] =
    useState(false);

  const initializeStoryteller = useCallback(
    (userId: string | undefined = undefined) => {
      if (!storytellerApiKey) {
        throw new Error('Storyteller SDK API key is not defined');
      } else if (!isStorytellerInitialized) {
        Storyteller.initialize(
          {
            apiKey: storytellerApiKey,
            externalId: userId,
          },
          () => {
            setIsStorytellerInitialized(true);
            this.row1Ref?.reloadData();
            this.row2Ref?.reloadData();
            this.row3Ref?.reloadData();
            this.row4Ref?.reloadData();
            Storyteller.version((version: string) => {
              console.log('Storyteller initialized', version);
            })
          },
        );
      }
    },
    [isStorytellerInitialized, storytellerApiKey],
  );

  useEffect(() => {
    if (!isStorytellerInitialized) {
      initializeStoryteller();
    }
  }, [initializeStoryteller, isStorytellerInitialized]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <StorytellerStoriesRowView
          ref={(ref: any) => {
            if (ref) this.row1Ref = ref;
          }}
          categories={[]}
          style={styles.storyContainer}
          onDataLoadCompleted={(
            _success: boolean,
            _error: Error,
            _dataCount: number,
          ) => {
            console.log("onDataLoadCompleted succes: " + _success + " error: " + _error + " dataCount: " + _dataCount);
          }}
        />
        <StorytellerStoriesRowView
          ref={(ref: any) => {
            if (ref) this.row2Ref = ref;
          }}
          categories={[]}
          style={styles.storyContainer}
          onDataLoadCompleted={(
            _success: boolean,
            _error: Error,
            _dataCount: number,
          ) => {
            console.log("onDataLoadCompleted succes: " + _success + " error: " + _error + " dataCount: " + _dataCount);
          }}
        />
        <StorytellerStoriesRowView
          ref={(ref: any) => {
            if (ref) this.row3Ref = ref;
          }}
          categories={[]}
          style={styles.storyContainer}
          onDataLoadCompleted={(
            _success: boolean,
            _error: Error,
            _dataCount: number,
          ) => {
            console.log("onDataLoadCompleted succes: " + _success + " error: " + _error + " dataCount: " + _dataCount);
          }}
        />
        <StorytellerStoriesRowView
          ref={(ref: any) => {
            if (ref) this.row4Ref = ref;
          }}
          categories={[]}
          style={styles.storyContainer}
          onDataLoadCompleted={(
            _success: boolean,
            _error: Error,
            _dataCount: number,
          ) => {
            console.log("onDataLoadCompleted succes: " + _success + " error: " + _error + " dataCount: " + _dataCount);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  storyContainer: {
    width: 'auto',
    height: 140,
    marginTop: 24,
  },
});

export default App;
