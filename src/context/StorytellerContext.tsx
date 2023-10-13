import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Storyteller from '@getstoryteller/react-native-storyteller-sdk';
import useStorytellerConfig from '../hooks/useStorytellerConfig';
import {NativeEventEmitter} from 'react-native';
import {useAmplitudeTracker} from '../hooks/useAmplitudeTracker';

const {ON_USER_ACTIVITY_OCCURRED} = Storyteller.getConstants();

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
            console.log('Storyteller initialized', Storyteller.version);
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

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(Storyteller);
    let eventListener = eventEmitter.addListener(
      ON_USER_ACTIVITY_OCCURRED,
      event => {
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
