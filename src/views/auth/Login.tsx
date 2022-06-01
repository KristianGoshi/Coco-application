import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import { APP_COLORS } from '../../assets/styles/colors';
import StyledButton, {EButtonType} from '../../components/Button';
import KeyboardAwareContainer from '../../components/Keyboard';
import { EAuthStack } from '../../navigation/stacks/AuthStack';
import TextInput from '../../components/Input';
import TouchableText from '../../components/TouchableText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { getUserDetails, loginUser } from '../../redux/actions/userActions';

export interface LoginProps {
  navigation: any;
  onPress(): () => void;
}

const Login: React.FC<LoginProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const [apiError, setApiError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enableButton, setEnableButton] = useState(false);

  const changeText = (text: string, type: string) => {
    setApiError('')
    if (type == 'username') {
      setUsername(text);
    } else {
      setPassword(text);
    }
  }

  useEffect(() => {
    if (username != '' && password != '') {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [username, password]);

  const onSubmit = useCallback(() => {
    if (username.length < 3) {
      setApiError(t('login.usernameError'));
      return;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setApiError(t('login.passwordError'));
      return;
    }
    fetchInfo();
  }, [username, password]);

  const fetchInfo = useCallback(async () => {
    await dispatch(loginUser());
    await dispatch(getUserDetails());
  }, []);

  return (
    <KeyboardAwareContainer>
      <View style={styles.container}>
        <View style={{alignSelf: 'center', width: 200, height: 200}}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{width: 200, height: 200}}
          />
        </View>
        <View>
          <Text style={styles.textStyle}>{t('login.text')}</Text>
        </View>
        <View style={[styles.textInput, {marginTop: 30}]}>
          <TextInput
            placeholder={t('login.username')}
            autoCapitalize="none"
            label={t('login.username')}
            onChangeText={text => changeText(text, 'username')}
          />
        </View>
        <View style={[styles.textInput, {marginTop: -5}]}>
          <TextInput
            placeholder={t('login.password')}
            autoCapitalize="none"
            label={t('login.password')}
            password
            onChangeText={text => changeText(text, 'password')}
          />
        </View>
        <View style={styles.errorView}>
          <Text style={styles.loginError}>{apiError}</Text>
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
              <Text style={{color: 'gray'}}>{t('login.button')}</Text>
            )}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 20}}>
            <TouchableText
              touchableText={t('login.doNotHaveAccount')}
              onPress={() => navigation.replace(EAuthStack.SIGNUP)}
              fontSize={12}
            />
          </View>
          <View style={{marginLeft: 20}}>
            <TouchableText
              touchableText={t('login.forgotPassword')}
              onPress={() => navigation.navigate(EAuthStack.RESET_PASSWORD)}
              fontSize={12}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  );
});

Login.displayName = 'Login';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 50,
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
  errorView: {
    alignSelf: 'center',
    marginTop: 5,
    width: '90%',
  },
});

export default Login;
