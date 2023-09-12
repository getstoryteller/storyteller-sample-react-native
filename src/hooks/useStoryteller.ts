import {useContext} from 'react';
import {StorytellerContext} from '../context/StorytellerContext';

const useStoryteller = () => useContext(StorytellerContext);

export default useStoryteller;
