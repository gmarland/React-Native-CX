import { SafeAreaProvider } from 'react-native-safe-area-context';

import ChatWrapper from './ChatWrapper';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatWrapper />
    </SafeAreaProvider>
  );
}
