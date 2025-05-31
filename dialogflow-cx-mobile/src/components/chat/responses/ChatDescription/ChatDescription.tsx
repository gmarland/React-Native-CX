import { View, Text } from 'react-native';

import { styles } from './ChatDescription.styles';

const ChatDescription = ({
  title,
  texts,
}: {
  title: string;
  texts: string[];
}) => {
  return (
    <View style={styles.containerStyles}>
      {title && title.length > 0 && (
        <View style={styles.descriptionStyles}>
          <Text style={styles.title}>{title}</Text>

          {texts &&
            texts.length > 0 &&
            texts.map((text, index) => (
              <Text key={index} style={styles.listText}>
                {text}
              </Text>
            ))}
        </View>
      )}
    </View>
  );
};

export default ChatDescription;
