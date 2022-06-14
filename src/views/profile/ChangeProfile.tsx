import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import StyledButton, {EButtonType} from '../../components/Button';
import KeyboardAwareContainer from '../../components/Keyboard';
import TextInput from '../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {editUser} from '../../redux/actions/userActions';
import { userProfileSelector } from '../../redux/selectors/userSelectors';

export interface ChangeProfileProps {
}

const ChangeProfile: React.FC<ChangeProfileProps> = React.memo(() => {
  const dispatch = useDispatch();
  const profile = useSelector(userProfileSelector);

  const {t} = useTranslation('user');
  const [apiError, setApiError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const changeText = (text: string, type: string) => {
    if (type == 'username') {
      setUsername(text);
    } else if (type == 'email') {
      setEmail(text);
    } else {
      setPhone(text);
    }
  };

  useEffect(() => {
    if (
      username != '' ||
      email != '' ||
      phone != ''
    ) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [username, email, phone]);

  const onSubmit = useCallback(() => {
    if (username && username.length < 3) {
      setApiError(t('editprofile.usernameError'));
      return;
    } else if (email && !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
      setApiError(t('editprofile.emailError'));
      return;
    } else if (phone && !/^\+[1-9]{1}[0-9]{3,14}$/.test(phone)) {
      //rregullo regexin per nr e telefonit
      setApiError(t('editprofile.phoneError'));
      return;
    }
    editprofile();
  }, [username, email, phone]);

  const editprofile = useCallback(async () => {
    await dispatch(
      editUser({
        userName: username || profile.userName,
        email: email || profile.email,
        nrTel: phone || profile.nrTel,
        password: profile.password
      }),
    );
    setSubmitted(true);
  }, [username, email, phone]);

  return (
    <KeyboardAwareContainer>
      <View style={styles.container}>
        {!submitted ? (
          <>
            <View style={styles.editprofileLogoWrapper}>
              <Icon name="pen-square" size={130} style={styles.iconStyle} />
            </View>
            <View style={[styles.textInput, {marginTop: 40}]}>
              <TextInput
                placeholder={profile.userName}
                autoCapitalize="none"
                label={t('editprofile.username')}
                onChangeText={text => changeText(text, 'username')}
              />
            </View>
            <View style={[styles.textInput, {marginTop: -5}]}>
              <TextInput
                placeholder={profile.email}
                autoCapitalize="none"
                label={t('editprofile.email')}
                onChangeText={text => changeText(text, 'email')}
              />
            </View>
            <View style={[styles.textInput, {marginTop: -5}]}>
              <TextInput
                placeholder={profile.nrTel}
                autoCapitalize="none"
                label={t('editprofile.phone')}
                onChangeText={text => changeText(text, 'phone')}
              />
            </View>
            <View style={{alignSelf: 'center', marginTop: 5, width: '90%'}}>
              <Text style={styles.editprofileError}>{apiError}</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <StyledButton
                type={
                  !enableButton || apiError != ''
                    ? EButtonType.DISABLED
                    : EButtonType.TRINARY
                }
                spinner={APP_COLORS.typography.body_text}
                onPress={() => onSubmit()}
                disabled={!enableButton || apiError != ''}
                children={() => (
                  <Text style={{color: APP_COLORS.background.extra}}>{t('editprofile.button')}</Text>
                )}
              />
            </View>
          </>
        ) : (
          <>
            <View style={[styles.editprofileLogoWrapper, {marginTop: 80}]}>
              <Icon name="check-circle" size={200} style={{color: APP_COLORS.background.container_secondary}} />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.textStyle}>{t('editprofile.success')}</Text>
            </View>
          </>
        )}
      </View>
    </KeyboardAwareContainer>
  );
});

ChangeProfile.displayName = 'Edit Profile';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  editprofileError: {
    color: APP_COLORS.typography.error,
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingBottom: 30,
    paddingTop: 15,
    width: '100%',
  },
  editprofileLogoWrapper: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    color: APP_COLORS.background.container_triary,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  textInput: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default ChangeProfile;
