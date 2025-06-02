import { TouchableOpacity, Text, Linking, View } from 'react-native';

import { styles } from './ChatButton.styles';

const ChatButton = ({
  isFirst = false,
  isLast = false,
  isButtonList = false,
  text,
  url,
  fullWidth = false,
  mainColor,
  mainTextColor,
  onButtonClicked,
}: {
  isFirst: boolean;
  isLast: boolean;
  isButtonList: boolean;
  text: string;
  url?: string | null;
  fullWidth?: boolean;
  mainColor: string;
  mainTextColor: string;
  onButtonClicked?: (value: string) => void;
}) => {
  const handlePress = () => {
    if (url) {
      Linking.openURL(url);
    } else {
      onButtonClicked?.(text);
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default ChatButton;
