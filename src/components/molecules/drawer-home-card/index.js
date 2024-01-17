import React from 'react';

import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';

const DrawerHomeCard = ({
  icon1,
  icon2,
  inactiveIcon,
  activeIcon,
  label1,
  label2,
  screenName,
  br = 0,
  containerStyle,
  onPress = () => {},
  isActive = false,
}) => {
  // const isActive = screenName;
  // const [isActive, setIsActive] = React.useState(false);

  // const handlePress = () => {
  //   setIsActive(!isActive);
  //   onPress();
  // };
  const handlePress = () => {
    if (!isActive) {
      onPress(screenName);
      // Additional logic to navigate to the corresponding screen
      // You may use navigation or some other mechanism to handle navigation
    }
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? colors.white : colors.primary,
        borderTopRightRadius: mvs(50),
        borderBottomRightRadius: mvs(50),
        width: '100%',
        paddingVertical: mvs(8),
      }}
      onPress={handlePress}>
      <Row
        style={[
          styles.homeContainer,
          containerStyle,
          {
            borderRadius: mvs(br),
            // backgroundColor: isActive ? colors.white : colors.primary,
            // borderTopRightRadius: mvs(20),
            // borderBottomRightRadius: mvs(20),
            width: '80%',
            // paddingVertical: mvs(20),
          },
        ]}>
        <Row>
          {activeIcon && inactiveIcon && (
            <Image
              source={isActive ? activeIcon : inactiveIcon}
              style={styles.img}
              resizeMode="contain"
            />
          )}
          <Bold
            label={label1}
            fontSize={mvs(18)}
            color={isActive ? colors.primary : colors.white}
            style={{marginLeft: mvs(10)}}
          />
        </Row>
        {
          <Row style={{marginRight: mvs(22)}}>
            {label2 && (
              <>
                {icon2 && <Image source={icon2} style={styles.img} />}
                <Medium label={label2} fontSize={mvs(15)} />
              </>
            )}
          </Row>
        }
      </Row>
    </TouchableOpacity>
  );
};

export default DrawerHomeCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: mvs(30),
  },
  profileContainer: {
    paddingHorizontal: mvs(30),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {height: mvs(25), width: mvs(25), marginRight: mvs(16)},
  homeContainer: {
    // paddingVertical: mvs(30),
    // backgroundColor: colors.white,
    // height: mvs(48),
    // width: width - 100,
    // marginHorizontal: mvs(17),
    // paddingHorizontal: mvs(17.5),

    alignItems: 'center',
    marginBottom: mvs(10),
  },
});
