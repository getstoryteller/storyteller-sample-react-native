import {StorytellerStoriesGridView as StorytellerSDKGridView} from '@getstoryteller/react-native-storyteller-sdk';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import TitleAndMoreButton from './TitleAndMoreButton';
import useRefCallback from '../hooks/useRefCallback';
import useStoryteller from '../hooks/useStoryteller';

interface StorytellerStoriesGridViewProps {
  categories: string[];
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  displayLimit?: number | undefined;
}

const StorytellerStoriesGridView = ({
  categories,
  title,
  displayLimit,
  moreButtonTitle,
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
    },
  });

  // TODO : Proper PTR

  return (
    <View>
      {title && (
        <TitleAndMoreButton title={title} moreButtonTitle={moreButtonTitle} />
      )}
      <StorytellerSDKGridView
        ref={storyGrid}
        categories={categories}
        displayLimit={displayLimit}
        style={styles.storyContainer}
      />
    </View>
  );
};

export default StorytellerStoriesGridView;
