import React from 'react';
import {View} from 'react-native';

import {styles} from './ChatError.styles';
import ChatHTML from '../ChatHTML/ChatHTML';

const ChatError = ({textToRender}: {textToRender: string}) => {
  const messageStyles = [
    styles.responseMessage,
    {color: '#ffffff', backgroundColor: '#ff7d7d'},
  ];

  return (
    <View style={styles.responseContainer}>
      <View style={[messageStyles]}>
        <ChatHTML
          textToRender={textToRender}
          contentWidth={300}
          baseStyle={{
            color: '#ffffff',
            fontSize: 17,
          }}
        />
      </View>
    </View>
  );
};

export default ChatError;
