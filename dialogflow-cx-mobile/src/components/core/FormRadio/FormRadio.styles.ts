import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  checkboxList: {},
  checkboxOptionsList: {
    gap: 10,
  },
  formCheckboxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  formCheckboxText: {
    fontSize: 17,
    flexShrink: 1,
  },
});
