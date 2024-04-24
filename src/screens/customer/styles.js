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

  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(20),
    // paddingBottom: mvs(100),
    // margi
  },
  contentContainerStyleFlatlist: {
    paddingVertical: mvs(10),
    flexGrow: 1,
    paddingHorizontal: mvs(20),
  },
  backgroundimg: {
    width: '100%',
    height: '100%',
  },
  selectedCustomerContainer: {
    width: '100%',
    height: mvs(45),
    backgroundColor: colors.primary,
    borderRadius: mvs(10),
    marginTop: mvs(6),
    justifyContent: 'center',
    paddingHorizontal: mvs(15),
  },
  customerText: {marginTop: mvs(10), color: colors.primary, fontSize: mvs(18)},
});
export default styles;
