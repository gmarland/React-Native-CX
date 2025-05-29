import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';

import {styles} from './ChatLoading.styles';

type ChatLoadingProps = {
  isVisible: boolean;
  mainColor: string;
};

const ChatLoading: React.FC<ChatLoadingProps> = ({isVisible, mainColor}) => {
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(1)).current;
  const opacity3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isVisible) {
      const createAnimation = (opacity: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
        );
      };

      createAnimation(opacity1, 0).start();
      createAnimation(opacity2, 200).start();
      createAnimation(opacity3, 400).start();
    }
  }, [isVisible, opacity1, opacity2, opacity3]);

  if (!isVisible) return null;

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingMessage}>
        <Animated.View
          style={[
            styles.circle,
            {backgroundColor: mainColor, opacity: opacity1},
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            {backgroundColor: mainColor, opacity: opacity2},
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            {backgroundColor: mainColor, opacity: opacity3},
          ]}
        />
      </View>
    </View>
  );
};

export default ChatLoading;
