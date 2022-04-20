import * as React from 'react';
import {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { APP_COLORS } from '../../assets/styles/colors';
import StyledButton, {EButtonType} from '../../components/Button';
import KeyboardAwareContainer from '../../components/Keyboard';
import { IProfile } from '../../models/IProfile';
import { EAuthStack } from '../../navigation/stacks/AuthStack';
import {useDispatch} from 'react-redux';
import TextInput from '../../components/Input';
import TouchableText from '../../components/TouchableText';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface LoginProps {
  navigation: any;
  onPress(): () => void;
}

const Login: React.FC<LoginProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const [apiError, setApiError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const shouldDisableSaveButton = false;

  return (
    <KeyboardAwareContainer>
      <View style={styles.container}>
        <View style={styles.loginLogoWrapper}>
          <Icon name="book" size={100} style={styles.iconStyle} />
        </View>
        <View style={{marginTop: 50}}>
          <Text style={styles.textStyle}>{t('login.text')}</Text>
        </View>
        <View style={[styles.textInput, {marginTop: 30}]}>
          <TextInput
            placeholder={t('login.email')}
            autoCapitalize="none"
            label={t('login.email')}
            type={undefined}
            errorText={undefined}
          />
        </View>
        <View style={[styles.textInput, {marginTop: 5}]}>
          <TextInput
            placeholder={t('login.password')}
            autoCapitalize="none"
            label={t('login.password')}
            type={undefined}
            password
            errorText={undefined}
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: 5, width: '90%'}}>
          <Text style={styles.loginError}>{apiError}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <StyledButton
            type={
              shouldDisableSaveButton || apiError
                ? EButtonType.DISABLED
                : EButtonType.PRIMARY
            }
            loading={loading}
            spinner={APP_COLORS.typography.body_text}
            //onPress={() => ()}
            disabled={!!(shouldDisableSaveButton || apiError)}
            children={() => (
              <Text
                style={{color: 'gray'}}>
                {t('login.title')}
              </Text>
            )}
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={{alignSelf: 'center'}}>
            <TouchableText
              touchableText={t('login.doNotHaveAccount')}
              onPress={() => navigation.navigate(EAuthStack.SIGNUP)}
              fontSize={12}
            />
          </View>
          <View style={{alignSelf: 'center'}}>
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
    color: APP_COLORS.background.container_background,
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

export default Login;
