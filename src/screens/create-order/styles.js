import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyleFlatlist: {
    paddingVertical: mvs(10),
  },

  cardStyle: {
    marginVertical: mvs(10),
    paddingVertical: mvs(10),
    overflow: 'hidden',
    paddingHorizontal: mvs(5),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(10),
  },

  contentContainerStyleNew: {
    flexGrow: 1,
    marginTop: '5%',
    borderRadius: mvs(20),
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),
    backgroundColor: colors.primary,
    marginHorizontal: mvs(20),
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

  addButton: {
    backgroundColor: colors.white,
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(10),
    borderRadius: mvs(10),
  },
});
export default styles;
