import { View, StyleSheet } from 'react-native';
import { ChatDialog } from 'dialogflow-cx-mobile';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatWrapper: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <ChatDialog
        chatURL="http://localhost:8080"
        agentPath="https://dialogflow.cloud.google.com/cx/projects/dotstorming/locations/global/agents/4459aa96-eebe-4419-8d28-77207f442165"
        sessionTimeout={30}
        mainColor="#ff0000"
        mainTextColor="#FFFFFF"
        sessionVariables={{
          userId: '12345',
          userName: 'John Doe',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default ChatWrapper;
