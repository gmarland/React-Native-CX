import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { styles } from './ChatInput.styles';
import AutoGrowTextarea from '../../core/AutoGrowTextarea/AutoGrowTextarea';

interface ChatInputProps {
  placeholder?: string;
  onMessageEntered?: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  placeholder = 'Message...',
  onMessageEntered,
}) => {
  const [textValue, setTextValue] = useState<string>('');

  const handleSendMessage = () => {
    if (textValue.trim() && onMessageEntered) {
      onMessageEntered(textValue.trim());
      setTextValue('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <AutoGrowTextarea
          placeholder={placeholder}
          textValue={textValue}
          setTextValue={setTextValue}
          onTextEntered={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="black" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;
