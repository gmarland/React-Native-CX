import {StyleSheet} from 'react-native';

export const formStyles = StyleSheet.create({
  containerStyles: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    gap: 15,
  },
  introduction: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 15,
  },
  nav: {
    flexDirection: 'row',
    padding: 15,
  },
  navButton: {
    flex: 1,
    padding: 15,
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
  },
  formInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formaCheckboxText: {
    fontSize: 17,
    flexShrink: 1,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
