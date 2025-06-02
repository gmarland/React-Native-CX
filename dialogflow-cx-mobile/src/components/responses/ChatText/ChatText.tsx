import { View } from 'react-native';

import { styles } from './ChatText.styles';
import ChatHTML from '../ChatHTML/ChatHTML';

const ChatText = ({
  textToRender,
  messageType,
  mainColor,
  mainTextColor,
}: {
  textToRender: string;
  messageType: 'inbound' | 'outbound';
  mainColor?: string;
  mainTextColor?: string;
}) => {
  const isMessageOutbound = messageType === 'outbound';

  const containerStyles = [
    styles.responseContainer,
    isMessageOutbound && styles.responseContainerOutbound,
  ];

  const messageStyles = [
    styles.responseMessage,
    isMessageOutbound
      ? { color: mainTextColor, backgroundColor: mainColor }
      : { color: '#000000', backgroundColor: '#ECECEC' },
  ];

  return (
    <View style={containerStyles}>
      <View style={[messageStyles]}>
        <ChatHTML
          textToRender={textToRender}
          contentWidth={300}
          baseStyle={{
            color: isMessageOutbound ? mainTextColor : '#000000',
            fontSize: 17,
          }}
        />
      </View>
    </View>
  );
};

export default ChatText;
