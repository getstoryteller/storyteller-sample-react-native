import {useCallback, useRef} from 'react';

function useRefCallback<T>(
  onMount: (node: T) => void,
  onUnmount: (node: T) => void = () => {},
) {
  const ref = useRef<T | null>(null);
  const setRef = useCallback(
    (node: T) => {
      if (ref.current) {
        onUnmount(ref.current);
      }

      if (node) {
        onMount(node);
      }

      // Save a reference to the node
      ref.current = node;
    },
    [onMount, onUnmount],
  );

  return [setRef];
}

export default useRefCallback;
