import {Layout, VerticalVideoList, VideoType} from '../models/content';
import StorytellerClipsGridView from './StorytellerClipsGridView';
import StorytellerClipsRowView from './StorytellerClipsRowView';
import StorytellerStoriesGridView from './StorytellerStoriesGridView';
import StorytellerStoriesRowView from './StorytellerStoriesRowView';
import React from 'react';

interface StorytellerStoryUnitProps {
  list: VerticalVideoList;
  onReloadComplete: (listId: string) => void;
}

const StorytellerStoryUnit = ({
  list,
  onReloadComplete,
}: StorytellerStoryUnitProps) => {
  const categories = list.categories?.map(category => category) || [];

  const isRowOfStories =
    list.layout === Layout.row && list.videoType === VideoType.stories;
  const isGridOfStories =
    list.layout === Layout.grid && list.videoType === VideoType.stories;
  const isRowOfClips =
    list.layout === Layout.row && list.videoType === VideoType.clips;
  const isGridOfClips =
    list.layout === Layout.grid && list.videoType === VideoType.clips;

  if (isRowOfStories) {
    return (
      <StorytellerStoriesRowView
        id={list.id}
        tileType={list.tileType}
        size={list.size}
        displayLimit={list.count}
        categories={categories}
        title={list.title}
        onReloadComplete={onReloadComplete}
      />
    );
  } else if (isGridOfStories) {
    return (
      <StorytellerStoriesGridView
        id={list.id}
        displayLimit={list.count}
        categories={categories}
        title={list.title}
        onReloadComplete={onReloadComplete}
      />
    );
  } else if (isRowOfClips && list.collection) {
    return (
      <StorytellerClipsRowView
        id={list.id}
        size={list.size}
        collection={list.collection}
        displayLimit={list.count}
        title={list.title}
        onReloadComplete={onReloadComplete}
      />
    );
  } else if (isGridOfClips && list.collection) {
    return (
      <StorytellerClipsGridView
        id={list.id}
        collection={list.collection}
        displayLimit={list.count}
        title={list.title}
        onReloadComplete={onReloadComplete}
      />
    );
  } else {
    return null;
  }
};

export default StorytellerStoryUnit;
