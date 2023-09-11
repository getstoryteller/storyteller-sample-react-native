import {VerticalVideoList} from '../models/content';
import React from 'react';
import StorytellerStoryUnit from './StorytellerStoryUnit';

interface VerticalVideoListRendererProps {
  verticalVideoLists: VerticalVideoList[];
}

const VerticalVideoListRenderer = ({
  verticalVideoLists,
}: VerticalVideoListRendererProps) => {
  console.log(verticalVideoLists);
  return (
    <>
      {verticalVideoLists.map((list: VerticalVideoList) => (
        <StorytellerStoryUnit key={list.id} list={list} />
      ))}
    </>
  );
};

export default VerticalVideoListRenderer;
