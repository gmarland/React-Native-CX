import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  containerStyles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

    // iOS Shadow
    shadowColor: '#222B38',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    gap: 10,
    maxWidth: '100%',

    // Android Shadow
    elevation: 5, // Required for Android shadows
  },
  title: {
    flexShrink: 1,
    fontSize: 17,
    color: '#000',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
});
