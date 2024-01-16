import React, {useEffect, useState} from 'react';
import useStorytellerConfig from '../hooks/useStorytellerConfig';
import VerticalVideoListRenderer from './VerticalVideoListRenderer';
import {View} from 'react-native';
import {VerticalVideoList} from '../models/content';

interface VerticalVideoListsProps {}

const VerticalVideoLists = ({}: VerticalVideoListsProps) => {
  const {storytellerApiKey} = useStorytellerConfig();

  let [lists, setLists] = useState<VerticalVideoList[]>([]);

  useEffect(() => {
    async function fetchData() {
      const verticalVideoListsApiURL = `https://sampleappcontent.usestoryteller.com/api/entries?apiKey=${storytellerApiKey}`;

      const entriesResponse = await fetch(verticalVideoListsApiURL);
      if (!entriesResponse.ok) {
        throw new Error('Failed to fetch data');
      }
      const {data: verticalVideoLists} = await entriesResponse.json();

      setLists(verticalVideoLists);
    }
    fetchData();
  }, [setLists, storytellerApiKey]);

  return (
    <View>
      <VerticalVideoListRenderer verticalVideoLists={lists} />
    </View>
  );
};

export default VerticalVideoLists;
