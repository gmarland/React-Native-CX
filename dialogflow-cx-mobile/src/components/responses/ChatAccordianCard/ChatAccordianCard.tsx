import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './ChatAccordianCard.styles';

interface ChatAccordianCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  text?: string;
  textVisible: boolean;
}

const IMAGE_WIDTH = 290;

const ChatAccordianCard: React.FC<ChatAccordianCardProps> = ({
  title,
  subtitle,
  image,
  text,
  textVisible,
}) => {
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  useEffect(() => {
    if (image) {
      Image.getSize(
        image,
        (width, height) => {
          const scaleFactor = IMAGE_WIDTH / width;
          setImageHeight(height * scaleFactor);
        },
        (error) => console.error('Failed to get image size:', error)
      );
    } else {
      setImageHeight(null);
    }
  }, [image]);

  const renderTextToggleIcon = () => {
    const pathData = textVisible
      ? 'M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14Z'
      : 'M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10Z';

    return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path d={pathData} />
      </Svg>
    );
  };

  return (
    <View>
      {image && (
        <Image
          source={{ uri: image }}
          style={[styles.image, { width: IMAGE_WIDTH, height: imageHeight }]}
        />
      )}
      <View style={styles.textContainer}>
        <View style={styles.descriptionStyles}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {text && text.length > 0 && renderTextToggleIcon()}
      </View>
    </View>
  );
};

export default ChatAccordianCard;
