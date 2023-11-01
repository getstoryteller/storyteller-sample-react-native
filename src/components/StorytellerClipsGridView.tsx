import {StorytellerClipsGridView as StorytellerSDKGridView} from '@getstoryteller/react-native-storyteller-sdk';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import TitleAndMoreButton from './TitleAndMoreButton';
import useRefCallback from '../hooks/useRefCallback';
import useStoryteller from '../hooks/useStoryteller';
import basicTheme from '../helpers/basicTheme';

interface StorytellerClipsGridViewProps {
  id: string;
  collection: string;
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

const StorytellerClipsGridView = ({
  id,
  collection,
  title,
  displayLimit,
  shouldReload,
  onReloadComplete,
}: StorytellerClipsGridViewProps) => {
  const {isStorytellerInitialized} = useStoryteller();
  let {ref: clipsGrid, setRef: setClipsGrid} =
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
    if (shouldReload && clipsGrid.current && isStorytellerInitialized) {
      clipsGrid.current?.reloadData();
    }
  }, [shouldReload, clipsGrid, isStorytellerInitialized]);

  const styles = StyleSheet.create({
    storyContainer: {
      width: '100%',
      marginLeft: 12,
      marginRight: 12,
      minHeight: 168,
    },
  });

  return (
    <View style={{overflow: 'hidden'}}>
      {title && <TitleAndMoreButton title={title} />}
      <StorytellerSDKGridView
        ref={setClipsGrid}
        collection={collection}
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

export default StorytellerClipsGridView;
