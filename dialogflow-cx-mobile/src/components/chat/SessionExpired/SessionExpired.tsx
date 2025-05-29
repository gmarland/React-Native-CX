import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from './SessionExpired.styles';

const SessionExpired = ({
  mainColor,
  mainTextColor,
  onRestartSession,
}: {
  mainColor: string;
  mainTextColor: string;
  onRestartSession: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.message}>
          Your current chat session has expired. You will need to restart your
          chat session to continue.
        </Text>
        <TouchableOpacity
          style={[
            styles.restartButton,
            {
              backgroundColor: mainColor,
            },
          ]}
          onPress={onRestartSession}>
          <Text
            style={[
              styles.buttonText,
              {
                color: mainTextColor,
              },
            ]}>
            Restart Chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionExpired;
