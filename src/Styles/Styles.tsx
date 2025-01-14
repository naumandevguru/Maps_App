import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  map: ViewStyle;
  infoContainer: ViewStyle;
  detailsRow: ViewStyle;
  text: TextStyle;
  textValue: TextStyle;
  input: ViewStyle;
  lodingText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  buttonContainer: ViewStyle;
  inputContainer: ViewStyle;
  coordinateContainer: ViewStyle;
}

export const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  map: {flex: 3, width: '100%', height: '100%'},
  infoContainer: {
    width: '99%',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 7,
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 22,
    paddingBottom: 7,
  },
  coordinateContainer: {
    width: '99%',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 7,
    paddingBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {color: 'white', fontSize: 16},
  textValue: {color: '#7FFFD4', fontSize: 16},
  input: {
    color: 'white',
    width: '48.5%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 3,
  },
  lodingText: {color: 'black', fontSize: 16},
  button: {
    width: '48.5%',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#F0BB78',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: '#1B1B1B',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
