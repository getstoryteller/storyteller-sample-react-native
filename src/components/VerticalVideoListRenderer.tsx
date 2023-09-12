import {VerticalVideoList} from '../models/content';
import React, {useCallback, useState} from 'react';
import StorytellerStoryUnit from './StorytellerStoryUnit';
import {FlatList, RefreshControl} from 'react-native';

interface VerticalVideoListRendererProps {
  verticalVideoLists: VerticalVideoList[];
}

const VerticalVideoListRenderer = ({
  verticalVideoLists,
}: VerticalVideoListRendererProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onPullToRefresh = useCallback(() => {
    setIsLoading(true);
    // storytellerRefs.forEach(ref => {
    //   ref.reloadData();
    // });
  }, [setIsLoading]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onPullToRefresh} />
      }
      data={verticalVideoLists}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return <StorytellerStoryUnit list={item} />;
      }}
    />
  );
};

export default VerticalVideoListRenderer;
