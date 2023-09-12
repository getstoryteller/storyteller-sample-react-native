import {StorytellerClipsRowView as StorytellerSDKRowView} from '@getstoryteller/react-native-storyteller-sdk';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Size} from '../models/content';
import TitleAndMoreButton from './TitleAndMoreButton';
import useStoryteller from '../hooks/useStoryteller';
import useRefCallback from '../hooks/useRefCallback';
import basicTheme from '../helpers/basicTheme';

interface StorytellerStoriesRowViewProps {
  id: string;
  size: keyof typeof Size;
  collection: string;
  title?: string | undefined;
  displayLimit?: number | undefined;
  onReloadComplete: (listId: string) => void;
  onError: (listId: string) => void;
}

const StorytellerClipsRowView = ({
  id,
  size,
  collection,
  title,
  displayLimit,
  onReloadComplete,
  onError,
}: StorytellerStoriesRowViewProps) => {
  const {isStorytellerInitialized} = useStoryteller();

  let [storyRow] = useRefCallback<StorytellerSDKRowView>(
    useCallback(
      row => {
        if (!isStorytellerInitialized) {
          return;
        }
        row.reloadData();
      },
      [isStorytellerInitialized],
    ),
  );

  let height = 100;
  switch (size) {
    case Size.medium:
      height = 240;
      break;
    case Size.large:
      height = 350;
      break;
  }

  const styles = StyleSheet.create({
    storyContainer: {
      width: 'auto',
      height: height,
    },
  });

  return (
    <View>
      {title && <TitleAndMoreButton title={title} />}
      <StorytellerSDKRowView
        ref={storyRow}
        collection={collection}
        displayLimit={displayLimit}
        style={styles.storyContainer}
        theme={basicTheme}
        onDataLoadCompleted={(
          success: boolean,
          _error: Error,
          dataCount: number,
        ) => {
          if (!success || dataCount === 0) {
            onError(id);
          }
          onReloadComplete(id);
        }}
      />
    </View>
  );
};

export default StorytellerClipsRowView;
