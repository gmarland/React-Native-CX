import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import { styles } from './ChatInfo.styles';

interface ChatInfoProps {
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

const IMAGE_WIDTH = 290;

const ChatInfo: React.FC<ChatInfoProps> = ({ title, subtitle, image, url }) => {
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!image) {
      setImageHeight(null);
      return;
    }

    Image.getSize(
      image,
      (width, height) => {
        const scaleFactor = IMAGE_WIDTH / width;
        setImageHeight(height * scaleFactor);
      },
      (error) => {
        console.error('Failed to get image size:', error);
      }
    );
  }, [image]);

  const renderCard = useMemo(() => {
    return (
      <View style={styles.containerStyles}>
        {image && (
          <Image
            source={{ uri: image }}
            style={[
              styles.image,
              { width: IMAGE_WIDTH, height: imageHeight || IMAGE_WIDTH },
            ]}
            resizeMode="contain"
          />
        )}
        <View style={styles.messageStyles}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    );
  }, [image, imageHeight, title, subtitle]);

  return url ? (
    <TouchableOpacity
      onPress={() => Linking.openURL(url)}
      accessibilityRole="link"
      accessibilityLabel={`Open ${title}`}
    >
      {renderCard}
    </TouchableOpacity>
  ) : (
    renderCard
  );
};

export default ChatInfo;
