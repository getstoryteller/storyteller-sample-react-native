import {Layout, VerticalVideoList, VideoType} from '../models/content';
import StorytellerStoriesGridView from './StorytellerStoriesGridView';
import StorytellerStoriesRowView from './StorytellerStoriesRowView';
import React from 'react';

interface StorytellerStoryUnitProps {
  list: VerticalVideoList;
}

const StorytellerStoryUnit = ({list}: StorytellerStoryUnitProps) => {
  const categories = list.categories?.map(category => category) || [];

  const isRowOfStories =
    list.layout === Layout.row && list.videoType === VideoType.stories;
  const isGridOfStories =
    list.layout === Layout.grid && list.videoType === VideoType.stories;

  if (isRowOfStories) {
    return (
      <StorytellerStoriesRowView
        key={list.id}
        tileType={list.tileType}
        size={list.size}
        displayLimit={list.count}
        categories={categories}
        title={list.title}
        moreButtonTitle={list.moreButtonTitle}
      />
    );
  } else if (isGridOfStories) {
    return (
      <StorytellerStoriesGridView
        key={list.id}
        displayLimit={list.count}
        categories={categories}
        title={list.title}
        moreButtonTitle={list.moreButtonTitle}
      />
    );
  } else {
    return null;
  }
};

export default StorytellerStoryUnit;
