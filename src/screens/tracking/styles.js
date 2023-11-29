import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapContainer: {
    // height: '70%',
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: mvs(20),
    borderRadius: mvs(10),
    padding: mvs(5),
    flex: 1,
    bottom:mvs(10)
  },
  imageBackGround: {
    width: mvs(70),
    height: mvs(70),
  },
  profileContainer: {
    padding: mvs(10),
    borderWidth: mvs(1),
    borderColor: colors.primary,
    marginTop: mvs(20),
    borderRadius: mvs(10),
    bottom:mvs(20)
  },
  chatBtn: {
    height: mvs(35),
    paddingVertical: mvs(5),
    marginRight: mvs(5),
    width:'30%'
  },
  

});
export default styles;