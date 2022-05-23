import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import { userProfileSelector } from '../../redux/selectors/userSelectors';

export interface MyProfileProps {
  navigation: any;
  onPress(): () => void;
}

const MyProfile: React.FC<MyProfileProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('user');

  const userName = useSelector(userProfileSelector).userName;

  useEffect(() => {

  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.loginLogoWrapper}>
          <Icon name="user-alt" size={80} style={styles.iconStyle} />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.textStyle}>{userName || 'Gzimi'}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <TouchableOpacity
            style={[styles.containerSettings, {marginRight: 20}]}>
            <Icon name="star" size={50} style={styles.settingsIconStyle} />
            <Text style={styles.settingsName}>{t('settings.favorite')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerSettings}>
            <Icon
              name="pen-square"
              size={50}
              style={styles.settingsIconStyle}
            />
            <Text style={styles.settingsName}>{t('settings.profile')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            style={[styles.containerSettings, {marginRight: 20}]}>
            <Icon name="language" size={50} style={styles.settingsIconStyle} />
            <Text style={styles.settingsName}>{t('settings.language')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerSettings}>
            <Icon name="key" size={50} style={styles.settingsIconStyle} />
            <Text style={styles.settingsName}>{t('settings.password')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 30}}>
          <TouchableOpacity
            style={[styles.containerSettings, {marginRight: 20}]}>
            <Icon
              name="info-circle"
              size={50}
              style={styles.settingsIconStyle}
            />
            <Text style={styles.settingsName}>{t('settings.info')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerSettings}>
            <Icon
              name="sign-out-alt"
              size={50}
              style={styles.settingsIconStyle}
            />
            <Text style={styles.settingsName}>{t('settings.logout')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
});

MyProfile.displayName = 'MyProfile';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  loginError: {
    color: APP_COLORS.typography.error,
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingBottom: 30,
    paddingTop: 15,
    width: '100%',
  },
  loginLogoWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    color: APP_COLORS.background.container_secondary,
  },
  settingsIconStyle: {
    color: APP_COLORS.background.container_primary,
    alignSelf: 'center',
    marginTop: 30,
  },
  settingsName: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
    marginTop: 15,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  containerSettings: {
    borderColor: APP_COLORS.background.elements_triary,
    backgroundColor: APP_COLORS.background.elements_triary,
    borderWidth: 1,
    height: 150,
    width: '45%',
    borderRadius: 16,
  },
});

export default MyProfile;
