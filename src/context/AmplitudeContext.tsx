import {init} from '@amplitude/analytics-react-native';
import React, {PropsWithChildren, useEffect} from 'react';
import useAmplitudeConfig from '../hooks/useAmplitudeConfig';

export const AmplitudeContext = React.createContext({
  isAmplitudeInitialized: false,
});

const AmplitudeContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {amplitudeApiKey} = useAmplitudeConfig();
  const [isAmplitudeInitialized, setAmplitudeInitialized] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (amplitudeApiKey) {
      init(amplitudeApiKey);
      console.log('Amplitude initialized');
      setAmplitudeInitialized(true);
    } else {
      console.warn(
        'Amplitude API key is not defined, but all events will be reported in console.',
      );
    }
  }, [amplitudeApiKey]);

  return (
    <AmplitudeContext.Provider value={{isAmplitudeInitialized}}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;
