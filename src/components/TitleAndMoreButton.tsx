import React from 'react';
import {Text, View} from 'react-native';

interface TitleAndMoreButtonProps {
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  category?: string | undefined;
}

const TitleAndMoreButton = ({
  title,
  moreButtonTitle,
  category,
}: TitleAndMoreButtonProps) => {
  return (
    <View className="flex space-between row mt-8">
      {title && (
        <Text className="text-lg sm:text-2xl font-bold px-4">{title}</Text>
      )}
      {title && moreButtonTitle && (
        <View className="ml-auto">
          <Text className="hover:underline pr-4 hover:text-white/[0.8] transition-all duration-200">
            {moreButtonTitle}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TitleAndMoreButton;
