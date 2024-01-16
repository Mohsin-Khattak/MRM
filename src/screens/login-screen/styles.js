import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flex: 1,
    paddingTop: mvs(10),
    // paddingHorizontal: mvs(20),
    // borderWidth: 1,
    // backgroundColor: 'red',
  },
  txt: {marginBottom: mvs(10), fontSize: mvs(20)},
  button: {
    width: '100%',
    paddingHorizontal: mvs(20),
    position: 'absolute',
    bottom: 0,
    paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40),
  },
  contentContainerStyleNew: {
    flexGrow: 1,
    // marginTop: mvs(100),
    // borderWidth: 1,
    paddingHorizontal: mvs(20),
    marginHorizontal: mvs(20),
    marginVertical: mvs(10),
    paddingVertical: mvs(20),
    backgroundColor: colors.white,
    bottom: mvs(30),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(14),
  },
  googlebutton: {
    backgroundColor: colors.white,
    marginHorizontal: mvs(10),
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(10),
    opacity: 0.8,
    alignSelf: 'center',
    borderRadius: mvs(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imagebackground: {
    height: mvs(110),

    width: width,
    position: 'absolute',

    //  width: '100%',
    // position: 'absolute',
  },
  loginlogoview: {
    alignSelf: 'center',
    marginTop: '25%',
    // borderWidth: 1,
  },
  lottieview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboradscrollcontent: {
    paddingHorizontal: mvs(0),
    flexGrow: 0,
    paddingBottom: mvs(150),
  },
  loginmoverstext: {
    marginTop: mvs(5),
    marginBottom: mvs(20),
  },
  forgotpasswordview: {
    alignSelf: 'flex-start',
    marginBottom: mvs(15),
  },
  createaccountview: {
    alignSelf: 'center',
    marginTop: mvs(20),
  },
  signupbuttoncontainer: {
    backgroundColor: colors.bluecolor,
    marginTop: mvs(20),
    borderRadius: mvs(10),
  },
  googlefacebookview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
