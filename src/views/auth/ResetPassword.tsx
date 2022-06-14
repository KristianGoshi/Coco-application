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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface ResetPasswordProps {
  navigation: any;
}

const ResetPassword: React.FC<ResetPasswordProps> = React.memo(({navigation}) => {
  const {t} = useTranslation('auth');
  const [apiError, setApiError] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const changeText = (text: string, type: string) => {
    setApiError('');
    if (type == 'email') {
      setEmail(text);
    } else {
      setPhone(text);
    }
  };

  useEffect(() => {
    if (
      email != '' ||
      phone != ''
    ) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [email, phone]);

  const onSubmit = useCallback(() => {
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) && email) {
      setApiError(t('resetPassword.emailError'));
      return;
    } else if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(phone) && phone) {
      //rregullo regexin per nr e telefonit
      setApiError(t('resetPassword.phoneError'));
      return;
    }
    resetPassword();
  }, [email, phone]);

  const resetPassword = useCallback(async () => {
    // await dispatch(
    //   resetUserPassword({
    //     email: email,
    //     nrTel: phone,
    //   }),
    // );
    setSubmitted(true);
  }, [email, phone]);

  return (
    <KeyboardAwareContainer>
      <View style={styles.container}>
        {!submitted ? (
          <>
            <View style={styles.resetPasswordLogoWrapper}>
              <Icon name="onepassword" size={100} style={styles.iconStyle} />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.textStyle}>{t('resetPassword.text')}</Text>
            </View>
            <View style={[styles.textInput, {marginTop: 40}]}>
              <TextInput
                placeholder={t('resetPassword.email')}
                autoCapitalize="none"
                label={t('resetPassword.email')}
                onChangeText={text => changeText(text, 'email')}
              />
            </View>
            <View style={[styles.textInput, {marginTop: -5}]}>
              <TextInput
                placeholder={t('resetPassword.phone')}
                autoCapitalize="none"
                label={t('resetPassword.phone')}
                onChangeText={text => changeText(text, 'phone')}
              />
            </View>
            <View style={styles.errorView}>
              <Text style={styles.resetPasswordError}>{apiError}</Text>
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
                  <Text style={{color: APP_COLORS.background.extra}}>
                    {t('resetPassword.button')}
                  </Text>
                )}
              />
            </View>
          </>
        ) : (
          <>
            <View style={[styles.resetPasswordLogoWrapper, {marginTop: 80}]}>
              <Icon name="check-circle" size={200} style={styles.iconStyle} />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.textStyle}>{t('resetPassword.success')}</Text>
            </View>
            <View style={{marginTop: 20}}>
              <TouchableText
                touchableText={t('resetPassword.clickToLogin')}
                onPress={() => navigation.navigate(EAuthStack.LOGIN)}
                fontSize={12}
              />
            </View>
          </>
        )}
      </View>
    </KeyboardAwareContainer>
  );
});

ResetPassword.displayName = 'Reset Passowrd';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  resetPasswordError: {
    color: APP_COLORS.typography.error,
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingBottom: 30,
    paddingTop: 15,
    width: '100%',
  },
  resetPasswordLogoWrapper: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    color: APP_COLORS.background.container_triary,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  textInput: {
    alignSelf: 'center',
    width: '90%',
  },
  errorView: {
    alignSelf: 'center',
    marginTop: 5,
    width: '90%',
  },
});

export default ResetPassword;
