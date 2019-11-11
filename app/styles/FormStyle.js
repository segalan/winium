import { StyleSheet } from 'react-native';

import COLORS from '../constants/Colors';

export default FormStyle = StyleSheet.create({
  whiteInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    color: '#FFF',
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
    fontSize: 16,
    marginTop: 10,
  },
  formItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  formIcon: {
    marginTop: 15,
    width: 32,
  },
  yellowButton: {
    backgroundColor: COLORS.yellow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  yellowBorderedButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.yellow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});
