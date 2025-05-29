import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';

import {styles} from './LoadingLine.styles';

interface LoadingLineProps {
  mainColor: string;
}

const LoadingLine: React.FC<LoadingLineProps> = ({mainColor}) => {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    setProgress(prev => (prev + 0.01 >= 1 ? 0 : prev + 0.01));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateProgress, 30);
    return () => clearInterval(interval);
  }, [updateProgress]);

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={progress}
        width={null}
        borderColor="#ccc"
        color={mainColor}
        animationType="spring"
      />
    </View>
  );
};

export default LoadingLine;
