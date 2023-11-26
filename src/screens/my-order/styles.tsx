import {StyleSheet} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    // flexGrow: 1,
    flex: 1,
    paddingVertical: mvs(30),
    paddingHorizontal: mvs(20),
    // paddingBottom: mvs(100),
  },
  contentContainerStyleFlatlist: {
    paddingVertical: mvs(10),
    // paddingHorizontal: mvs(20),
    paddingBottom: mvs(120),
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  rendercontainer: {
    padding: mvs(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: mvs(10),
  },
  notificationicon: {
    width: mvs(35),
    height: mvs(35),
    resizeMode: 'contain',
  },
  titleandtextview: {
    flex: 1,
    paddingHorizontal: mvs(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'white',
    padding: mvs(20),
    height: mvs(300),
    borderRadius: mvs(10),
  },
  textInput: {
    marginTop: mvs(30),
    borderWidth: mvs(1),
    borderColor: colors.black,
    padding: mvs(10),
    marginBottom: mvs(10),
    borderRadius: mvs(10),
    height: mvs(130),
  },
  cross: {
    padding: mvs(14),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: mvs(-5),
  },
});
export default styles;
