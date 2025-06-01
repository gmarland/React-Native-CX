import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  scrollView: {
    gap: 16,
    padding: 20,
    paddingBottom: 80,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 16,
  },
  lastMessage: {
    marginBottom: 80,
  },
  outboundMessage: {
    alignSelf: 'flex-end',
  },
  inboundMessage: {
    alignSelf: 'flex-start',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  blockoutContainer: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  blockout: {
    height: 30,
    width: '100%',
    backgroundColor: '#fff',
  },
});
