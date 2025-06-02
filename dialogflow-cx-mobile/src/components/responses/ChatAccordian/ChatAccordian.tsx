import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { styles } from './ChatAccordian.styles';
import ChatHTML from '../ChatHTML/ChatHTML';
import ChatAccordianCard from '../ChatAccordianCard/ChatAccordianCard';

interface ChatAccordianProps {
  title: string;
  subtitle?: string | null;
  image?: string | null;
  text?: string | null;
}

const ChatAccordian: React.FC<ChatAccordianProps> = ({
  title,
  subtitle,
  image,
  text,
}) => {
  const [textVisible, setTextVisible] = React.useState(false);

  return (
    <View style={styles.containerStyles}>
      {text && text.length > 0 ? (
        <>
          <TouchableOpacity onPress={() => setTextVisible(!textVisible)}>
            <ChatAccordianCard
              title={title}
              subtitle={subtitle ? subtitle : undefined}
              image={image ? image : undefined}
              text={text}
              textVisible={textVisible}
            />
          </TouchableOpacity>
          {textVisible && (
            <View style={styles.contentContainer}>
              <ChatHTML
                textToRender={text}
                contentWidth={300}
                baseStyle={{
                  color: '#000000',
                  fontSize: 17,
                }}
              />
            </View>
          )}
        </>
      ) : (
        <ChatAccordianCard
          title={title}
          subtitle={subtitle ? subtitle : undefined}
          image={image ? image : undefined}
          text={text ? text : undefined}
          textVisible={textVisible}
        />
      )}
    </View>
  );
};

export default ChatAccordian;
