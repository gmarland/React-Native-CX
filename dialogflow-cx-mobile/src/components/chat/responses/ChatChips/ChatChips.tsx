import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import type { IChip } from '../../../../interfaces/responses/IChip';

import { styles } from './ChatChips.styles';

const ChatChips = ({ chips }: { chips: IChip[] }) => {
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
          onPress={() => Linking.openURL(chip.url)}
        >
          {renderCard(chip, index)}
        </TouchableOpacity>
      );
    } else {
      return renderCard(chip, index);
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
