import React, {useEffect, useState} from 'react';
import useStorytellerConfig from '../hooks/useStorytellerConfig';
import VerticalVideoListRenderer from './VerticalVideoListRenderer';

interface VerticalVideoListsProps {}

const VerticalVideoLists = ({}: VerticalVideoListsProps) => {
  const {storytellerApiKey} = useStorytellerConfig();

  let [lists, setLists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const verticalVideoListsApiURL = `https://sampleappcontent.usestoryteller.com/api/entries?apiKey=${storytellerApiKey}`;

      const entriesResponse = await fetch(verticalVideoListsApiURL);
      if (!entriesResponse.ok) {
        throw new Error('Failed to fetch data');
      }
      const {data: verticalVideoLists} = await entriesResponse.json();
      console.log(verticalVideoLists);

      setLists(verticalVideoLists);
    }
    fetchData();
  }, [setLists, storytellerApiKey]);

  return <VerticalVideoListRenderer verticalVideoLists={lists} />;
};

export default VerticalVideoLists;
