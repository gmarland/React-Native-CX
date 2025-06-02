import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
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
});
