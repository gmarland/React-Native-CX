import { View } from 'react-native';

import { styles } from './ChatError.styles';
import ChatHTML from '../ChatHTML/ChatHTML';

const ChatError = ({ textToRender }: { textToRender: string }) => {
  return (
    <View style={styles.responseContainer}>
      <View style={styles.responseInnerContainer}>
        <ChatHTML
          textToRender={textToRender}
          contentWidth={300}
          baseStyle={{
            color: '#ffffff',
            fontSize: 17,
            fontWeight: 'bold',
          }}
        />
      </View>
    </View>
  );
};

export default ChatError;
