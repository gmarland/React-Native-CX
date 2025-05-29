import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerStyles: {
    borderRadius: 10,
    maxWidth: 290,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',

    // iOS Shadow
    shadowColor: '#222B38',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Android Shadow
    elevation: 5, // Required for Android shadows
  },
  messageStyles: {
    gap: 5,
    padding: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
