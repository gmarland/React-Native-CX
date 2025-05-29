import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 24,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
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
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sendButton: {
    padding: 10,
  },
});
