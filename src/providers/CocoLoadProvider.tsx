import * as React from 'react';
import {useCallback, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {useTranslation} from 'react-i18next';

const CocoLoadProvider: React.FC = React.memo(() => {
  const {i18n} = useTranslation();

  const fetchLanguage = useCallback(async () => {
    const lang = await AsyncStorage.getItem('language');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await i18n.changeLanguage(lang);
  }, []);

  const fetchUserInfo = useCallback(async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
  }, []);

  const fetchFavorites = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites');
  }, []);

  useEffect(() => {
    fetchLanguage();
    fetchUserInfo();
    fetchFavorites();
  }, [fetchLanguage, fetchUserInfo, fetchFavorites]);
  return <></>;
});

CocoLoadProvider.displayName = 'CocoLoadProvider';

export default CocoLoadProvider;
