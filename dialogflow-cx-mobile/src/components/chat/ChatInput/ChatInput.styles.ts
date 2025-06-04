import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 24,
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sendButton: {
    padding: 10,
  },
});
