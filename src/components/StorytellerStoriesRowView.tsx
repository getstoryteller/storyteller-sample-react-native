import {StorytellerStoriesRowView as StorytellerSDKRowView} from '@getstoryteller/react-native-storyteller-sdk';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Size, TileType} from '../models/content';

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

  // TODO : Add TitleAndMoreButton component

  return (
    <StorytellerSDKRowView
      ref={(ref: any) => {
        if (ref) {
          ref.reloadData();
        }
      }}
      cellType={cellType}
      categories={categories}
      displayLimit={displayLimit}
      style={styles.storyContainer}
    />
  );
};

export default StorytellerStoriesRowView;
