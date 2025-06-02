import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { IFile } from '../../../interfaces/responses/IFile';
import { styles } from './ChatFiles.styles';

interface ChatFilesProps {
  files: IFile[];
}

const ChatFiles: React.FC<ChatFilesProps> = ({ files }) => {
  const renderCard = (file: IFile) => (
    <View style={styles.containerStyles}>
      {file.image && (
        <Image source={{ uri: file.image }} style={styles.image} />
      )}
      {file.name && <Text style={styles.title}>{file.name}</Text>}
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z" />
      </Svg>
    </View>
  );

  const renderFile = (file: IFile, index: number) => {
    const key = `file_${index}`;

    return file.url ? (
      <TouchableOpacity key={key} onPress={() => Linking.openURL(file.url)}>
        {renderCard(file)}
      </TouchableOpacity>
    ) : (
      <View key={key}>{renderCard(file)}</View>
    );
  };

  return (
    <View style={styles.chipsContainer}>
      {files?.map((file, index) => renderFile(file, index))}
    </View>
  );
};

export default ChatFiles;
