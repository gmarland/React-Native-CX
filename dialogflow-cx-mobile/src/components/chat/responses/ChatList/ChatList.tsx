import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';

import {styles} from './ChatList.styles';
import {IListItem} from '../../../interfaces/IListItem';

const ChatList = ({items}: {items: IListItem[]}) => {
  const renderCard = (item: IListItem, index: number) => {
    return (
      <View>
        {item.image && item.image.length > 0 && (
          <Image
            source={{uri: item.image}}
            style={[
              styles.image,
              index === 0
                ? {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }
                : {},
            ]}
          />
        )}
        {item.title && item.title.length > 0 && (
          <View style={styles.messageStyles}>
            <Text style={styles.title}>{item.title}</Text>
            {item.subtitle && item.subtitle.length > 0 && (
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderListItem = (item: IListItem, index: number) => {
    if (item.url && item.url.length > 0) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          {renderCard(item, index)}
        </TouchableOpacity>
      );
    } else {
      return renderCard(item, index);
    }
  };

  return (
    <View style={styles.containerStyles}>
      {items.map((item, index) => (
        <View key={index}>
          <View>{renderListItem(item, index)}</View>
          {index < items.length - 1 && (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default ChatList;
