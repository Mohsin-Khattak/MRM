import CustomFlatList from 'components/atoms/custom-flatlist';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AboutUsCard from 'components/molecules/about-us-card';
import { ABOUT_US_LIST } from 'config/constants';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import React from 'react';
import { View } from 'react-native';
import i18n from 'translation';
import styles from './styles';
const CategoriesScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  const renderServiceList = ({item}) => (
    <AboutUsCard
      item={item}
      // onPress={() =>
      //   props?.navigation?.navigate(item?.screen, {title: t(item?.title)})
      // }
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('about_us')} />

      <View style={styles.body}>
        <CustomFlatList
          // numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={ABOUT_US_LIST}
          renderItem={renderServiceList}
          // columnWrapperStyle={{justifyContent: 'space-between'}}
          ItemSeparatorComponent={itemSeparatorComponent()}
        />
      </View>
    </View>
  );
};
export default CategoriesScreen;
