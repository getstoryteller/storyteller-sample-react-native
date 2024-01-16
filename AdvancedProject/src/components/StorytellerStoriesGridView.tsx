import {StorytellerStoriesGridView as StorytellerSDKGridView} from '@getstoryteller/react-native-storyteller-sdk';
import React, {useCallback, useEffect} from 'react';
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
  shouldReload: boolean;
  onReloadComplete: (
    listId: string,
    success: boolean,
    error: Error,
    dataCount: number,
  ) => void;
}

const StorytellerStoriesGridView = ({
  id,
  categories,
  title,
  displayLimit,
  shouldReload,
  onReloadComplete,
}: StorytellerStoriesGridViewProps) => {
  const {isStorytellerInitialized} = useStoryteller();
  let {ref: storyGrid, setRef: setStoryGrid} =
    useRefCallback<StorytellerSDKGridView>(
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

  useEffect(() => {
    if (shouldReload && storyGrid.current && isStorytellerInitialized) {
      storyGrid.current?.reloadData();
    }
  }, [shouldReload, storyGrid, isStorytellerInitialized]);

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
        ref={setStoryGrid}
        categories={categories}
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

export default StorytellerStoriesGridView;
