import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TitleAndMoreButtonProps {
  title?: string | undefined;
}

const TitleAndMoreButton = ({title}: TitleAndMoreButtonProps) => {
  return <View>{title && <Text style={[styles.rowTitle]}>{title}</Text>}</View>;
};

export const styles = StyleSheet.create({
  rowTitle: {
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 8,
    marginLeft: 12,
    marginBottom: 8,
  },
});

export default TitleAndMoreButton;
