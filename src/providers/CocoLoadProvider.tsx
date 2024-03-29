import * as React from 'react';
import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import { getUserDetails, getUserFavorites } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { getUserReservations } from '../redux/actions/reserveActions';
import i18n from '../assets/langs/i18n';

const initI18n = i18n;

const CocoLoadProvider: React.FC = React.memo(() => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();

  const fetchLanguage = useCallback(async () => {
    const lang = await AsyncStorage.getItem('language');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await i18n.changeLanguage(lang);
  }, []);

  const fetchUserInfo = useCallback(async () => {
    await dispatch(getUserDetails());
  }, []);

  const fetchFavorites = useCallback(async () => {
    await dispatch(getUserFavorites());
  }, []);

  const fetchReservations = useCallback(async () => {
    await dispatch(getUserReservations());
  }, []);

  useEffect(() => {
    fetchLanguage();
    fetchUserInfo();
    fetchFavorites();
    fetchReservations();
  }, [fetchLanguage, fetchUserInfo, fetchFavorites, fetchReservations]);
  return <></>;
});

CocoLoadProvider.displayName = 'CocoLoadProvider';

export default CocoLoadProvider;
