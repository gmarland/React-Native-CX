import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import { styles } from './ChatInfo.styles';

const ChatInfo = ({
  title,
  subtitle,
  image,
  url,
}: {
  title: string;
  subtitle: string;
  image: string;
  url: string;
}) => {
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const IMAGE_WIDTH = 290;

  useEffect(() => {
    if (!image || image.length === 0) {
      setImageHeight(null);
      return;
    } else {
      Image.getSize(
        image,
        (width, height) => {
          const scaleFactor = IMAGE_WIDTH / width;
          const scaledHeight = height * scaleFactor;
          setImageHeight(scaledHeight);
        },
        (error) => {
          console.error('Failed to get image size:', error);
        }
      );
    }
  }, [image]);

  const renderCard = () => {
    return (
      <View style={styles.containerStyles}>
        {image && image.length > 0 && (
          <Image
            source={{ uri: image }}
            style={[styles.image, { width: IMAGE_WIDTH, height: imageHeight }]}
          />
        )}
        {title && title.length > 0 && (
          <View style={styles.messageStyles}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && subtitle.length > 0 && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return url && url.length > 0 ? (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      {renderCard()}
    </TouchableOpacity>
  ) : (
    renderCard()
  );
};

export default ChatInfo;
