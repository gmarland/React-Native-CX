import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import type { IChip } from '../../../../interfaces/responses/IChip';

import { styles } from './ChatChips.styles';

const ChatChips = ({
  chips,
  onButtonClicked,
}: {
  chips: IChip[];
  onButtonClicked?: (value: string) => void;
}) => {
  const renderCard = (chip: IChip, index: number) => {
    return (
      <View key={index} style={styles.containerStyles}>
        {chip.image && chip.image.length > 0 && (
          <Image source={{ uri: chip.image }} style={styles.image} />
        )}
        {chip.title && chip.title.length > 0 && (
          <Text style={styles.title}>{chip.title}</Text>
        )}
      </View>
    );
  };

  const renderChip = (chip: IChip, index: number) => {
    if (chip.url && chip.url.length > 0) {
      return (
        <TouchableOpacity
          key={`touch_${index}`}
          onPress={() => handleClick(chip)}
        >
          {renderCard(chip, index)}
        </TouchableOpacity>
      );
    } else {
      return renderCard(chip, index);
    }
  };

  const handleClick = (chip: IChip) => {
    if (chip.url && chip.url.length > 0) {
      Linking.openURL(chip.url);
    } else {
      onButtonClicked?.(chip.title);
    }
  };

  return (
    <View style={styles.chipsContainer}>
      {chips &&
        chips.length > 0 &&
        chips.map((chip, index) => renderChip(chip, index))}
    </View>
  );
};

export default ChatChips;
