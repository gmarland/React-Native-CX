import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import type { IListItem } from '../../../interfaces/responses/IListItem';
import { styles } from './ChatList.styles';

const ChatList = ({ items }: { items: IListItem[] }) => {
  const renderCard = (item: IListItem, index: number) => (
    <View>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={[styles.image, index === 0 && styles.firstImage]}
        />
      )}
      {item.title && (
        <View style={styles.messageStyles}>
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderListItem = (item: IListItem, index: number) =>
    item.url ? (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        {renderCard(item, index)}
      </TouchableOpacity>
    ) : (
      renderCard(item, index)
    );

  return (
    <View style={styles.containerStyles}>
      {items.map((item, index) => (
        <View key={index}>
          {renderListItem(item, index)}
          {index < items.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

export default ChatList;
