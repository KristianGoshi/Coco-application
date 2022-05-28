import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import StyledButton, {EButtonType} from '../../components/Button';
import KeyboardAwareContainer from '../../components/Keyboard';
import {EAuthStack} from '../../navigation/stacks/AuthStack';
import TextInput from '../../components/Input';
import TouchableText from '../../components/TouchableText';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {editUser} from '../../redux/actions/userActions';
import {userProfileSelector} from '../../redux/selectors/userSelectors';

export interface ChangePasswordProps {
  navigation: any;
  onPress(): () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = React.memo(
  ({navigation}) => {
    const dispatch = useDispatch();
    const profile = useSelector(userProfileSelector);

    const {t} = useTranslation('user');
    const [apiError, setApiError] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [password, setPassword] = useState('');
    const [enableButton, setEnableButton] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const changeText = (text: string, type: string) => {
      setApiError('');
      if (type == 'password') {
        setPassword(text);
      } else {
        setRepeatPassword(text);
      }
    };

    useEffect(() => {
      if (
        password != '' &&
        repeatPassword != ''
      ) {
        setEnableButton(true);
      } else {
        setEnableButton(false);
      }
    }, [password, repeatPassword]);

    const onSubmit = useCallback(() => {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        setApiError(t('signup.passwordError'));
        return;
      } else if (password != repeatPassword) {
        setApiError(t('signup.repeatPasswordError'));
        return;
      }
      changePassword();
    }, [password, repeatPassword]);

    const changePassword = useCallback(async () => {
      await dispatch(
        editUser({
          userName: profile.userName,
          email: profile.email,
          nrTel: profile.nrTel,
          password: password,
        }),
      );
      setSubmitted(true);
    }, [password]);

    return (
      <KeyboardAwareContainer>
        <View style={styles.container}>
          {!submitted ? (
            <>
              <View style={styles.changePasswordLogoWrapper}>
                <Icon name="key" size={120} style={styles.iconStyle} />
              </View>
              <View style={[styles.textInput, {marginTop: 50}]}>
                <TextInput
                  placeholder={t('signup.password')}
                  autoCapitalize="none"
                  label={t('signup.password')}
                  password
                  onChangeText={text => changeText(text, 'password')}
                />
              </View>
              <View style={[styles.textInput, {marginTop: -5}]}>
                <TextInput
                  placeholder={t('signup.repeatPassword')}
                  autoCapitalize="none"
                  label={t('signup.repeatPassword')}
                  password
                  onChangeText={text => changeText(text, 'repeatPassword')}
                />
              </View>
              <View style={{alignSelf: 'center', marginTop: 5, width: '90%'}}>
                <Text style={styles.changePasswordError}>{apiError}</Text>
              </View>
              <View style={styles.buttonWrapper}>
                <StyledButton
                  type={
                    !enableButton || apiError != ''
                      ? EButtonType.DISABLED
                      : EButtonType.PRIMARY
                  }
                  spinner={APP_COLORS.typography.body_text}
                  onPress={() => onSubmit()}
                  disabled={!enableButton || apiError != ''}
                  children={() => (
                    <Text style={{color: 'gray'}}>
                      {t('changePassword.button')}
                    </Text>
                  )}
                />
              </View>
            </>
          ) : (
            <>
              <View style={[styles.changePasswordLogoWrapper, {marginTop: 80}]}>
                <Icon name="check-circle" size={200} style={styles.iconStyle} />
              </View>
              <View style={{marginTop: 30}}>
                <Text style={styles.textStyle}>
                  {t('changePassword.success')}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <TouchableText
                  touchableText={t('changePassword.goback')}
                  onPress={() => navigation.goback()}
                  fontSize={12}
                />
              </View>
            </>
          )}
        </View>
      </KeyboardAwareContainer>
    );
  },
);

ChangePassword.displayName = 'Change Password';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  changePasswordError: {
    color: APP_COLORS.typography.error,
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingBottom: 30,
    paddingTop: 15,
    width: '100%',
  },
  changePasswordLogoWrapper: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    color: APP_COLORS.background.container_secondary,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  textInput: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default ChangePassword;
