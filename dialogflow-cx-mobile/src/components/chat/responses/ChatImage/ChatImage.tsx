import { View, Image } from 'react-native';

import { styles } from './ChatImage.styles';
import { useEffect, useState } from 'react';

const ChatImage = ({ url }: { url: string }) => {
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const IMAGE_WIDTH = 290;

  useEffect(() => {
    Image.getSize(
      url,
      (width, height) => {
        const scaleFactor = IMAGE_WIDTH / width;
        const scaledHeight = height * scaleFactor;
        setImageHeight(scaledHeight);
      },
      (error) => {
        console.error('Failed to get image size:', error);
      }
    );
  }, [url]);

  return (
    <View style={[styles.containerStyles, { width: IMAGE_WIDTH }]}>
      <Image
        source={{ uri: url }}
        style={[styles.image, { width: IMAGE_WIDTH, height: imageHeight }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default ChatImage;
