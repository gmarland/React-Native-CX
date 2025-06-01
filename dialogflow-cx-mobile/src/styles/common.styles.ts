import { StyleSheet } from 'react-native';

import { coreStyles } from './core.styles';

export const commonStyles = StyleSheet.create({
  errorAlert: {
    fontSize: coreStyles.defaultFont.fontSize,
    fontWeight: 'bold',
    color: '#ff0000',
    backgroundColor: '#FCD9D9',
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ff0000',
    textAlign: 'center',
  },
});
