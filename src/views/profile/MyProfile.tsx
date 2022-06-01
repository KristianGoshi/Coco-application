import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import { userProfileSelector } from '../../redux/selectors/userSelectors';
import { EProfileStack } from '../../navigation/stacks/ProfileStack';
import { logoutUser } from '../../redux/actions/userActions';

export interface MyProfileProps {
  navigation: any;
  onPress(): () => void;
}

const MyProfile: React.FC<MyProfileProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('user');

  const userName = useSelector(userProfileSelector).userName;
  const [showModal, setModal] = useState(false);

  const logout = useCallback(async () => {
    setModal(false);
    await dispatch(logoutUser());
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.loginLogoWrapper}>
          <Icon name="user-alt" size={80} style={styles.iconStyle} />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.textStyle}>{userName}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <TouchableOpacity
            style={[styles.containerSettings, {marginRight: 20}]}
            onPress={() => navigation.navigate(EProfileStack.FAVORITES)}>
            <Icon name="star" size={50} style={styles.settingsIconStyle} />
            <Text style={styles.settingsName}>{t('settings.favorite')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerSettings}
            onPress={() => navigation.navigate(EProfileStack.EDIT_PROFILE)}>
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
            style={[styles.containerSettings, {marginRight: 20}]}
            onPress={() => navigation.navigate(EProfileStack.CHANGE_LANGUAGE)}>
            <Icon name="language" size={50} style={styles.settingsIconStyle} />
            <Text style={styles.settingsName}>{t('settings.language')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerSettings}
            onPress={() => navigation.navigate(EProfileStack.CHANGE_PASSWORD)}>
            <Icon name="key" size={50} style={styles.settingsIconStyle} />
            <Text style={styles.settingsName}>{t('settings.password')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 30}}>
          <TouchableOpacity
            style={[styles.containerSettings, {marginRight: 20}]}
            onPress={() => navigation.navigate(EProfileStack.INFO)}>
            <Icon
              name="info-circle"
              size={50}
              style={styles.settingsIconStyle}
            />
            <Text style={styles.settingsName}>{t('settings.info')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerSettings}
            onPress={() => setModal(true)}>
            <Icon
              name="sign-out-alt"
              size={50}
              style={styles.settingsIconStyle}
            />
            <Text style={styles.settingsName}>{t('settings.logout')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{t('settings.sureLogout')}</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[
                  styles.modalButton,
                  {marginRight: 5, backgroundColor: 'white'},
                ]}
                onPress={() => setModal(!showModal)}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      marginTop: 9,
                      color: APP_COLORS.background.container_secondary,
                    },
                  ]}>
                  {t('settings.cancel')}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, {marginLeft: 5}]}
                onPress={() => logout()}>
                <Text style={[styles.textStyle, {marginTop: 9}]}>{t('settings.confirm')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  containerSettings: {
    borderColor: APP_COLORS.background.elements_triary,
    backgroundColor: APP_COLORS.background.elements_triary,
    borderWidth: 1,
    height: 150,
    width: '45%',
    borderRadius: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    borderColor: APP_COLORS.background.container_secondary,
    borderWidth: 2,
    backgroundColor: APP_COLORS.background.container_secondary,
    height: 40,
    width: 150,
  },
  modalTitle: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
  },
});

export default MyProfile;
