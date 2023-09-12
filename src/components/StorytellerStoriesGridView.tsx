import {StorytellerStoriesGridView as StorytellerSDKGridView} from '@getstoryteller/react-native-storyteller-sdk';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import TitleAndMoreButton from './TitleAndMoreButton';
import useRefCallback from '../hooks/useRefCallback';
import useStoryteller from '../hooks/useStoryteller';
import basicTheme from '../helpers/basicTheme';

interface StorytellerStoriesGridViewProps {
  id: string;
  categories: string[];
  title?: string | undefined;
  displayLimit?: number | undefined;
  onReloadComplete: (listId: string) => void;
}

const StorytellerStoriesGridView = ({
  id,
  categories,
  title,
  displayLimit,
  onReloadComplete,
}: StorytellerStoriesGridViewProps) => {
  const {isStorytellerInitialized} = useStoryteller();
  let [storyGrid] = useRefCallback<StorytellerSDKGridView>(
    useCallback(
      grid => {
        if (!isStorytellerInitialized) {
          return;
        }
        grid.reloadData();
      },
      [isStorytellerInitialized],
    ),
  );

  const styles = StyleSheet.create({
    storyContainer: {
      width: 'auto',
      marginLeft: 12,
      marginRight: 12,
      minHeight: 168,
    },
  });

  return (
    <View style={{overflow: 'hidden'}}>
      {title && <TitleAndMoreButton title={title} />}
      <StorytellerSDKGridView
        ref={storyGrid}
        categories={categories}
        displayLimit={displayLimit}
        style={styles.storyContainer}
        theme={basicTheme}
        onDataLoadCompleted={(
          _success: boolean,
          _error: Error,
          _dataCount: number,
        ) => {
          onReloadComplete(id);
        }}
      />
    </View>
  );
};

export default StorytellerStoriesGridView;
