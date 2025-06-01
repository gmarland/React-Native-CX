import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  loadingMessage: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 14,
    backgroundColor: '#ececec',
    marginBottom: 40,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 15,
    marginHorizontal: 5,
  },
});
