import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Storyteller, { type StorytellerAd, type AdResponse, type GetAdsForListEvent, EventType, type UserActivityOccurredEvent } from '@getstoryteller/react-native-storyteller-sdk';
import useStorytellerConfig from '../hooks/useStorytellerConfig';
import {NativeEventEmitter} from 'react-native';
import {useAmplitudeTracker} from '../hooks/useAmplitudeTracker';
import StorytellerGAMAds, {
  EventType as GAMEventType,
} from '@getstoryteller/react-native-storyteller-sdk-gam';

const {ON_USER_ACTIVITY_OCCURRED, GET_ADS_FOR_LIST} = Storyteller.getConstants();

export const StorytellerContext = React.createContext({
  isStorytellerInitialized: false,
  initializeStoryteller: (_userId?: string) => {},
});

const StorytellerContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const {storytellerApiKey} = useStorytellerConfig();
  const {logUserActivityToAmplitude} = useAmplitudeTracker();

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

  const _onGetGAMAdsForList = (event: GetAdsForListEvent) => {
    console.log(`GetAdsForList ${JSON.stringify(event)}`);
    StorytellerGAMAds.fetchAds(event)
    .then((value: StorytellerAd) => {
      var storytellerAd: AdResponse | null = null;
      if (event.stories) {
        storytellerAd = {
          id: event.stories.story.id,
          ad: value,
        };
      } else if (event.clips) {
        storytellerAd = {
          id: event.clips.clip.id,
          ad: value,
        };
      }
      console.log(`Got ads\n` + `ads: ${JSON.stringify(storytellerAd)}`);
      Storyteller.setAdResult({ad: storytellerAd, error: null});
    })
    .catch(error => {
      console.log(`Got error\n` + `error: ${JSON.stringify(error)}`);
      Storyteller.setAdResult({ad: null, error: error});
    });
  };

  const _onUserActivityOccurred = (event: UserActivityOccurredEvent) => {
    console.log(
      `ActivityOccurred\n` +
        `type: ${event.type}, data: ${JSON.stringify(event.data)}`,
    );
    var eventType = null;
    switch (event.type) {
      case EventType.AdActionButtonTapped:
        eventType = GAMEventType.adActionButtonTapped;
        break;
      case EventType.DismissedAd:
        eventType = GAMEventType.dismissedAd;
        break;
      case EventType.DismissedClip:
        eventType = GAMEventType.dismissedClip;
        break;
      case EventType.DismissedStory:
        eventType = GAMEventType.dismissedStory;
        break;
      case EventType.FinishedAd:
        eventType = GAMEventType.finishedAd;
        break;
      case EventType.OpenedAd:
        eventType = GAMEventType.openedAd;
        break;
    }
    if (eventType !== null && event.data.adId !== undefined) {
      StorytellerGAMAds.onUserActivityOccurred(eventType, {
        adId: event.data.adId,
      });
    }
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(Storyteller);
    StorytellerGAMAds.configureStoryAds(
      '12102683',
      '/33813572/stories-native-ad-unit',
      {},
    );
    StorytellerGAMAds.configureClipAds(
      '12269089',
      '/33813572/clips-native-ad-unit',
      {},
    );
    let eventListener = eventEmitter.addListener(
      GET_ADS_FOR_LIST,
      event => {
        _onGetGAMAdsForList(event);
      },
    );

    return () => {
      eventListener.remove();
    };
  }, []);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(Storyteller);
    let eventListener = eventEmitter.addListener(
      ON_USER_ACTIVITY_OCCURRED,
      event => {
        _onUserActivityOccurred(event);
        logUserActivityToAmplitude(event.type, event.data);
      },
    );

    return () => {
      eventListener.remove();
    };
  }, [logUserActivityToAmplitude]);

  return (
    <StorytellerContext.Provider
      value={{
        isStorytellerInitialized,
        initializeStoryteller,
      }}>
      {children}
    </StorytellerContext.Provider>
  );
};

export default StorytellerContextProvider;
