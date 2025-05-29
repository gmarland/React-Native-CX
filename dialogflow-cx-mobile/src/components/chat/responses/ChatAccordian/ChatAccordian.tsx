import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {styles} from './ChatAccordian.styles';
import ChatHTML from '../ChatHTML/ChatHTML';

const ChatAccordian = ({
  title,
  subtitle,
  image,
  text,
}: {
  title: string;
  subtitle: string | null;
  image: string | null;
  text: string | null;
}) => {
  const [textVisible, setTextVisible] = React.useState(false);

  const renderCard = () => {
    return (
      <View>
        {image && image.length > 0 && (
          <Image source={{uri: image}} style={[styles.image]} />
        )}
        <View style={styles.textContainer}>
          <View style={styles.descriptionStyles}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {text &&
            text.length > 0 &&
            (textVisible ? (
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></Path>
              </Svg>
            ) : (
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></Path>
              </Svg>
            ))}
        </View>
      </View>
    );
  };

  const renderAll = () => {
    if (text && text.length > 0) {
      return (
        <>
          <TouchableOpacity onPress={() => setTextVisible(!textVisible)}>
            {renderCard()}
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
      );
    } else {
      return renderCard();
    }
  };

  return <View style={styles.containerStyles}>{renderAll()}</View>;
};

export default ChatAccordian;
