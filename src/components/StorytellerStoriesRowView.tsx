import {StorytellerStoriesRowView as StorytellerSDKRowView} from '@getstoryteller/react-native-storyteller-sdk';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Size, TileType} from '../models/content';
import TitleAndMoreButton from './TitleAndMoreButton';
import useStoryteller from '../hooks/useStoryteller';
import useRefCallback from '../hooks/useRefCallback';

interface StorytellerStoriesRowViewProps {
  tileType: keyof typeof TileType;
  size: keyof typeof Size;
  categories: string[];
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  displayLimit?: number | undefined;
}

const StorytellerStoriesRowView = ({
  tileType,
  size,
  categories,
  title,
  displayLimit,
  moreButtonTitle,
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

  let height = 140;
  switch (size) {
    case Size.medium:
      height = 240;
      break;
    case Size.large:
      height = 350;
      break;
  }

  let cellType = tileType === TileType.round ? 'round' : 'square';

  const styles = StyleSheet.create({
    storyContainer: {
      width: 'auto',
      height: height,
    },
  });

  // TODO : Proper PTR

  return (
    <View>
      {title && (
        <TitleAndMoreButton title={title} moreButtonTitle={moreButtonTitle} />
      )}
      <StorytellerSDKRowView
        ref={storyRow}
        cellType={cellType}
        categories={categories}
        displayLimit={displayLimit}
        style={styles.storyContainer}
      />
    </View>
  );
};

export default StorytellerStoriesRowView;
