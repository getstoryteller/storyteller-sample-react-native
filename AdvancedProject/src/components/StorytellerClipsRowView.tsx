import {StorytellerClipsRowView as StorytellerSDKRowView} from '@getstoryteller/react-native-storyteller-sdk';
import React, {useCallback, useEffect} from 'react';
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
  shouldReload: boolean;
  onReloadComplete: (
    listId: string,
    success: boolean,
    error: Error,
    dataCount: number,
  ) => void;
}

const StorytellerClipsRowView = ({
  id,
  size,
  collection,
  title,
  displayLimit,
  shouldReload,
  onReloadComplete,
}: StorytellerStoriesRowViewProps) => {
  const {isStorytellerInitialized} = useStoryteller();

  let {ref: clipsRow, setRef: setClipsRow} =
    useRefCallback<StorytellerSDKRowView>(
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

  useEffect(() => {
    if (shouldReload && clipsRow.current && isStorytellerInitialized) {
      clipsRow.current?.reloadData();
    }
  }, [shouldReload, clipsRow, isStorytellerInitialized]);

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
        ref={setClipsRow}
        collection={collection}
        displayLimit={displayLimit}
        style={styles.storyContainer}
        theme={basicTheme}
        onDataLoadCompleted={(
          _success: boolean,
          _error: Error,
          _dataCount: number,
        ) => {
          onReloadComplete(id, _success, _error, _dataCount);
        }}
      />
    </View>
  );
};

export default StorytellerClipsRowView;
