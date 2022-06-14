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
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../redux/actions/userActions';

export interface SignUpProps {
  navigation: any;
}

const SignUp: React.FC<SignUpProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const [apiError, setApiError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [password, setPassword] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const changeText = (text: string, type: string) => {
    setApiError('');
    if (type == 'username') {
      setUsername(text);
    } else if (type == 'email') {
      setEmail(text);
    } else if (type == 'phone') {
      setPhone(text);
    } else if (type == 'password') {
      setPassword(text);
    } else {
      setRepeatPassword(text);
    }
  };

  useEffect(() => {
    if (
      username != '' &&
      email != '' &&
      phone != '' &&
      password != '' &&
      repeatPassword != ''
    ) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [username, email, phone, password, repeatPassword]);

  const onSubmit = useCallback(() => {
    if (username.length < 3) {
      setApiError(t('signup.usernameError'));
      return;
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
      setApiError(t('signup.emailError'));
      return;
    } else if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(phone)) {
      //rregullo regexin per nr e telefonit
      setApiError(t('signup.phoneError'));
      return;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setApiError(t('signup.passwordError'));
      return;
    } else if (password != repeatPassword) {
      setApiError(t('signup.repeatPasswordError'));
      return;
    }
    signUp();
  }, [username, email, phone, password, repeatPassword]);

  const signUp = useCallback(async () => {
    await dispatch(
      registerUser({
        userName: username,
        email: email,
        nrTel: phone,
        password: password,
      }),
    );
    setSubmitted(true);
  }, [username, email, phone, password]);

  return (
    <KeyboardAwareContainer>
      <View style={styles.container}>
        {!submitted ? (
          <>
            <View style={styles.signupLogoWrapper}>
              <Icon name="user-plus" size={100} style={styles.iconStyle} />
            </View>
            <View style={[styles.textInput, {marginTop: 20}]}>
              <TextInput
                placeholder={t('signup.username')}
                autoCapitalize="none"
                label={t('signup.username')}
                onChangeText={text => changeText(text, 'username')}
              />
            </View>
            <View style={[styles.textInput, {marginTop: -5}]}>
              <TextInput
                placeholder={t('signup.email')}
                autoCapitalize="none"
                label={t('signup.email')}
                onChangeText={text => changeText(text, 'email')}
              />
            </View>
            <View style={[styles.textInput, {marginTop: -5}]}>
              <TextInput
                placeholder={t('signup.phone')}
                autoCapitalize="none"
                label={t('signup.phone')}
                onChangeText={text => changeText(text, 'phone')}
              />
            </View>
            <View style={[styles.textInput, {marginTop: -5}]}>
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
              <Text style={styles.signupError}>{apiError}</Text>
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
                  <Text style={{color: APP_COLORS.background.extra}}>{t('signup.button')}</Text>
                )}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableText
                touchableText={t('signup.haveAccount')}
                onPress={() => navigation.replace(EAuthStack.LOGIN)}
                fontSize={12}
              />
            </View>
          </>
        ) : (
          <>
            <View style={[styles.signupLogoWrapper, {marginTop: 80}]}>
              <Icon name="check-circle" size={200} style={styles.iconStyle} />
            </View>
            <View style={{marginTop: 30}}>
              <Text style={styles.textStyle}>{t('signup.successSignUp')}</Text>
            </View>
            <View style={{marginTop: 20}}>
              <TouchableText
                touchableText={t('signup.clickToLogin')}
                onPress={() => navigation.replace(EAuthStack.LOGIN)}
                fontSize={12}
              />
            </View>
          </>
        )}
      </View>
    </KeyboardAwareContainer>
  );
});

SignUp.displayName = 'SignUp';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80
  },
  signupError: {
    color: APP_COLORS.typography.error,
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingBottom: 30,
    paddingTop: 15,
    width: '100%',
  },
  signupLogoWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    color: APP_COLORS.background.container_triary,
  },
  textStyle: {
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

export default SignUp;
