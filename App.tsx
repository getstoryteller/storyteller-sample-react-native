/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Appearance,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

const {StorytellerSdk} = NativeModules;

import Storyteller, {
  StorytellerRowView,
  StorytellerGridView,
} from '@getstoryteller/react-native-storyteller-sdk';
const {USER_NAVIGATED_TO_APP, GET_ADS_FOR_LIST, ON_USER_ACTIVITY_OCCURRED} =
  Storyteller.getConstants();
import type {
  EventType,
  UserActivityData,
  ClientStory,
} from '@getstoryteller/react-native-storyteller-sdk';

import {Colors} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component<any, any> {
  private rowRef?: StorytellerRowView;
  private gridRef?: StorytellerGridView;

  private actionListener: any;
  private adsListener: any;
  private userActivityListener: any;

  constructor(props: any) {
    super(props);

    // Callback for when the user interacts with the SDK
    this._initializeStoryteller();
  }

  componentDidMount(): void {
    const storytellerEvt =
      Platform.OS === 'ios'
        ? new NativeEventEmitter(StorytellerSdk)
        : new NativeEventEmitter();
    this.actionListener = storytellerEvt.addListener(
      USER_NAVIGATED_TO_APP,
      this._onUserNavigatedToApp,
    ); // Callback for when the user swipes up on a page configured as inApp link
    this.adsListener = storytellerEvt.addListener(
      GET_ADS_FOR_LIST,
      this._onGetAdsForList,
    ); // Callback for when the SDK needs ads to render, if your integration uses ads
    this.userActivityListener = storytellerEvt.addListener(
      ON_USER_ACTIVITY_OCCURRED,
      this._onUserActivityOccurred,
    );
  }

  componentWillUnmount(): void {
    this.actionListener.remove();
    this.adsListener.remove();
    this.userActivityListener.remove();
  }

  _onUserActivityOccurred = (body: {
    type: EventType;
    data: UserActivityData;
  }) => {
    console.log(
      `ActivityOccurred\n` +
        `type: ${body.type}, data: ${JSON.stringify(body.data)}`,
    );
  };

  _onUserNavigatedToApp = (body: {url: string}) => {
    console.log(`UserNavigatedToApp\n` + `url: ${body.url}`);
  };

  _onGetAdsForList = (body: {stories: [ClientStory]}) => {
    console.log(`GetAdsForList\n` + `stories: ${JSON.stringify(body.stories)}`);
  };

  _initializeStoryteller = () => {
    Storyteller.initialize(
      'test-key',
      'test-user',
      '', // URL of custom instance to run API
      (callback: {result: Boolean; message: string}) => {
        console.log(`result: ${callback.result} message: ${callback.message}`);
        this._reloadDataIfNeeded();
      },
    );
  };

  _reloadDataIfNeeded = () => {
    if (this.rowRef) this.rowRef.reloadData();
    if (this.gridRef) this.gridRef.reloadData();
  };

  render() {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <StorytellerRowView
              ref={(ref: any) => {
                if (ref) this.rowRef = ref;
              }}
              style={styles.storyContainer}

              // learn more - https://docs.getstoryteller.com/documents/react-native-sdk/StorytellerComponent

              // Categories for which row will display storie
              // categories={}

              // Style of the cell in the row - can be 'round' or 'square'
              // cellType={}

              // SDK specific appearance style
              // uiStyle={}

              // SDK specific appearance customization
              // theme={}

              // Callback for when the SDK starts loading story data
              // onDataLoadStarted={}

              // Callback for when the SDK finishes loading story data
              // onDataLoadCompleted={}

              // Callback for when the user exits the story player view
              // onStoryDismiss={}

              // Callback for when a tile in the row becomes visible
              // onTileBecameVisible={}

              // Callback for when the SDK opens a deep link and reports success
              // onOpenDeeplinkResult={}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const isDarkMode = Appearance.getColorScheme() === 'dark';

const backgroundStyle = {
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  flex: 1,
};

const styles = StyleSheet.create({
  storyContainer: {
    height: 168,
    width: 'auto',
  },
});

export default App;
