import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonList: {
    padding: 10,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonListFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  buttonListLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  responseText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  shadow: {
    // iOS Shadow
    shadowColor: '#222222',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    // Android Shadow
    elevation: 5, // Required for Android shadows
  },
});
