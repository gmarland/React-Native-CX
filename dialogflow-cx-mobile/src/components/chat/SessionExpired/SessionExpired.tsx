import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './SessionExpired.styles';

interface SessionExpiredProps {
  mainColor: string;
  mainTextColor: string;
  onRestartSession: () => void;
}

const SessionExpired: React.FC<SessionExpiredProps> = ({
  mainColor,
  mainTextColor,
  onRestartSession,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.message}>
          Your current chat session has expired. You will need to restart your
          chat session to continue.
        </Text>
        <TouchableOpacity
          style={[styles.restartButton, { backgroundColor: mainColor }]}
          onPress={onRestartSession}
          activeOpacity={0.8} // Improves UX by adding feedback on press
        >
          <Text style={[styles.buttonText, { color: mainTextColor }]}>
            Restart Chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(SessionExpired); // Use React.memo for performance optimization
