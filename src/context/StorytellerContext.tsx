import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Storyteller from '@getstoryteller/react-native-storyteller-sdk';
import useStorytellerConfig from '../hooks/useStorytellerConfig';

export const StorytellerContext = React.createContext({
  isStorytellerInitialized: false,
  initializeStoryteller: (_userId?: string) => {},
});

const StorytellerContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const {storytellerApiKey} = useStorytellerConfig();

  const [isStorytellerInitialized, setIsStorytellerInitialized] =
    useState(false);

  const initializeStoryteller = useCallback(
    (userId: string | undefined = undefined) => {
      if (!storytellerApiKey) {
        throw new Error('Web SDK API key is not defined');
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
