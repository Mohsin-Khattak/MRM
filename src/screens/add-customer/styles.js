import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(20),
    // paddingVertical: mvs(10),
  },
  lan: {
    height: mvs(120),
    marginTop: mvs(20),
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: mvs(24),
  },
  heading: {
    fontSize: mvs(20),
    color: colors.primary,
  },
  normaltext: {
    fontSize: mvs(14),
    paddingVertical: mvs(4),
  },

  // contentContainerStyle: {
  //   flexGrow: 1,
  //   paddingHorizontal: mvs(16),
  //   paddingVertical: mvs(20),
  //   // paddingBottom: mvs(100),
  //   // margi
  // },
  // contentContainerStyleFlatlist: {
  //   paddingVertical: mvs(10),
  //   flexGrow: 1,
  //   // paddingHorizontal: mvs(20),
  //   paddingBottom: mvs(100),
  // },
  contentContainerStyle: {
    // flexGrow: 1,
    // paddingTop: '50%',
    // borderWidth: 1,
    // paddingBottom: mvs(200),

    paddingHorizontal: mvs(20),
  },
  contentContainerStyleNew: {
    flexGrow: 1,
    marginTop: '15%',
    borderRadius: mvs(20),
    paddingHorizontal: mvs(30),
    marginVertical: mvs(10),
    paddingVertical: mvs(50),
    backgroundColor: colors.primary,

    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  keyboardcontentcontainer: {
    paddingHorizontal: mvs(0),
    flexGrow: 0,
    paddingBottom: mvs(200),
  },
  backgroundimg: {
    width: '100%',
    height: '100%',
  },
});
export default styles;
