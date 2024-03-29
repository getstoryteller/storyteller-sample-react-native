import {VerticalVideoList} from '../models/content';
import React, {useCallback, useState} from 'react';
import StorytellerStoryUnit from './StorytellerStoryUnit';
import {FlatList, RefreshControl} from 'react-native';

export interface VerticalVideoListModel extends VerticalVideoList {
  shouldReload: boolean;
}

interface VerticalVideoListRendererProps {
  verticalVideoLists: VerticalVideoList[];
}

const VerticalVideoListRenderer = ({
  verticalVideoLists,
}: VerticalVideoListRendererProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const storytellerLists = verticalVideoLists.map(list => {
    return {
      ...list,
      shouldReload: false,
    };
  });

  const onPullToRefresh = useCallback(() => {
    setIsLoading(true);
    storytellerLists.forEach(list => {
      list.shouldReload = true;
    });
  }, [setIsLoading, storytellerLists]);

  const onReloadComplete = useCallback(
    (listId: string, success: boolean, error: Error, dataCount: number) => {
      setIsLoading(false);
      if (
        storytellerLists &&
        storytellerLists.filter(list => list.id === listId).length > 0
      ) {
        storytellerLists.filter(list => list.id === listId)[0].shouldReload =
          false;
      }
      console.log(
        `onReloadComplete: [listId = ${listId}, success = ${success}, error = ${error}, dataCount = ${dataCount}]`,
      );
    },
    [setIsLoading, storytellerLists],
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onPullToRefresh} />
      }
      data={storytellerLists}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <StorytellerStoryUnit
            list={item}
            shouldReload={item.shouldReload}
            onReloadComplete={onReloadComplete}
          />
        );
      }}
    />
  );
};

export default VerticalVideoListRenderer;
