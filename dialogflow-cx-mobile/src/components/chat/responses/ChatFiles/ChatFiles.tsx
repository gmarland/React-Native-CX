import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {styles} from './ChatFiles.styles';
import {IFile} from '../../../interfaces/IFile';

const ChatFiles = ({files}: {files: IFile[]}) => {
  const renderCard = (iFile: IFile, index: number) => {
    return (
      <View key={index} style={styles.containerStyles}>
        {iFile.image && iFile.image.length > 0 && (
          <Image source={{uri: iFile.image}} style={styles.image} />
        )}
        {iFile.name && iFile.name.length > 0 && (
          <Text style={styles.title}>{iFile.name}</Text>
        )}
        <Svg width={20} height={20} viewBox="0 0 24 24">
          <Path d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"></Path>
        </Svg>
      </View>
    );
  };

  const renderFile = (iFile: IFile, index: number) => {
    if (iFile.url && iFile.url.length > 0) {
      return (
        <TouchableOpacity
          key={`touch_${index}`}
          onPress={() => Linking.openURL(iFile.url)}>
          {renderCard(iFile, index)}
        </TouchableOpacity>
      );
    } else {
      return renderCard(iFile, index);
    }
  };

  return (
    <View style={styles.chipsContainer}>
      {files &&
        files.length > 0 &&
        files.map((f, index) => renderFile(f, index))}
    </View>
  );
};

export default ChatFiles;
