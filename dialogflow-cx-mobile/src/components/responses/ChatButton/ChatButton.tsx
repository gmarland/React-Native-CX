import { TouchableOpacity, Text, Linking, View } from 'react-native';

import { styles } from './ChatButton.styles';

const ChatButton = ({
  isFirst = false,
  isLast = false,
  isButtonList = false,
  text,
  value,
  fullWidth = false,
  mainColor,
  mainTextColor,
  onButtonClicked,
}: {
  isFirst: boolean;
  isLast: boolean;
  isButtonList: boolean;
  text: string;
  value: string;
  fullWidth?: boolean;
  mainColor: string;
  mainTextColor: string;
  onButtonClicked?: (value: string) => void;
}) => {
  const extractLinkFromContent = (content: string) => {
    const urlRegex = /(http|https):\/\/\S+/;
    const match = content.match(urlRegex);
    return match ? match[0] : null;
  };

  const _link = extractLinkFromContent(value);

  const handlePress = () => {
    if (_link) {
      Linking.openURL(_link);
    } else {
      onButtonClicked?.(value);
    }
  };

  return (
    <View style={styles.container}>
      {_link ? (
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.button,
            styles.shadow,
            {
              backgroundColor: mainColor,
              width: fullWidth ? '100%' : 290,
            },
          ]}
        >
          <Text
            style={[
              styles.responseText,
              {
                color: mainTextColor,
              },
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.shadow,
            isButtonList ? styles.buttonList : styles.button,
            isFirst && isButtonList ? styles.buttonListFirst : {},
            isLast && isButtonList ? styles.buttonListLast : {},
            {
              backgroundColor: mainColor,
              width: fullWidth ? '100%' : 290,
            },
          ]}
        >
          <Text
            style={[
              styles.responseText,
              {
                color: mainTextColor,
              },
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatButton;
