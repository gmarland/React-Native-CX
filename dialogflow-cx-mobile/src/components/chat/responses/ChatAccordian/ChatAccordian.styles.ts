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
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionStyles: {
    gap: 5,
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
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 15,
  },
});
