import {useContext} from 'react';
import {track} from '@amplitude/analytics-react-native';
import {AmplitudeContext} from '../context/AmplitudeContext';
import {
  EventType,
  UserActivityData,
} from '@getstoryteller/react-native-storyteller-sdk';

export const useAmplitudeTracker = () => {
  const {isAmplitudeInitialized} = useContext(AmplitudeContext);

  const logUserActivityToAmplitude = (
    type: EventType,
    data: UserActivityData,
  ) => {
    switch (type) {
      case EventType.OpenedStory:
        logOpenedStory(data);
        break;
      case EventType.OpenedPage:
        logOpenedPage(data);
        break;
      case EventType.ActionButtonTapped:
        logActionButtonTapped(data);
        break;
      default:
        break;
    }
  };

  const logOpenedStory = (data: UserActivityData) => {
    let eventData = {
      'Story ID': data.storyId,
      'Story Category': data.categories?.join(';'),
      'Page ID': data.pageId,
      'Story Title': data.storyTitle,
      'Page Index': data.pageIndex,
    };

    logEvent('OpenedStory', eventData);
  };

  const logOpenedPage = (data: UserActivityData): void => {
    let eventData = {
      'Story ID': data.storyId,
      'Story Title': data.storyTitle,
      'Story Index': data.storyIndex,
      'Page ID': data.pageId,
      'Page Index': data.pageIndex,
      'Page Type': data.pageType,
      'Page Has Action': data.pageHasAction,
      'Page Action Text': data.pageActionText,
      'Page Action URL': data.pageActionUrl,
      'Content Length': data.contentLength,
    };

    logEvent('OpenedPage', eventData);
  };

  const logActionButtonTapped = (data: UserActivityData): void => {
    let eventData = {
      'Story ID': data.storyId,
      'Story Title': data.storyTitle,
      'Story Index': data.storyIndex,
      'Page ID': data.pageId,
      'Page Index': data.pageIndex,
      'Page Type': data.pageType,
      'Page Has Action': data.pageHasAction,
      'Page Action Text': data.pageActionText,
      'Page Action URL': data.pageActionUrl,
      'Content Length': data.contentLength,
    };

    logEvent('ActionButtonTapped', eventData);
  };

  const logEvent = (eventName: string, eventProperties?: any): void => {
    if (isAmplitudeInitialized) {
      track(eventName, eventProperties);
    } else {
      console.log(`AmplitudeTracker: ${eventName}`, eventProperties);
    }
  };

  return {
    logUserActivityToAmplitude,
  };
};
