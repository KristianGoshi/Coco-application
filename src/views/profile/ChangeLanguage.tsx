import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import StyledRadio from '../../components/Radio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import { APP_COLORS } from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface ChangeLanguageProps {
  navigation: any;
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = React.memo(
  ({navigation}) => {
    const {t, i18n} = useTranslation('user');
    const [lang, setLang] = useState('');

    useEffect(() => {
      setLang(i18n.language);
    }, []);

    const changeLanguage = async (lang: any) => {
      i18n.changeLanguage(lang);
      setLang(lang);
      try {
        await AsyncStorage.setItem('language', lang);
      } catch (error) {
        console.log('Something went wrong', error);
      }
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.languageLogoWrapper}>
            <Icon name="language" size={140} style={styles.iconStyle} />
          </View>
          <Text style={styles.titleStyle}>{t('changeLanguage.language')}</Text>
          <TouchableOpacity
            style={styles.sectionView}
            onPress={() => changeLanguage('al')}>
            <Image
              source={require('../../assets/images/polish.png')}
              style={styles.image}
            />
            <Text style={styles.languageTitle}>
              <>{t('changeLanguage.albanian')} AL</>
            </Text>
            <View style={styles.radioPosition}>
              <StyledRadio
                onClick={() => changeLanguage('al')}
                selected={lang == 'al'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionView}
            onPress={() => changeLanguage('en')}>
            <Image
              source={require('../../assets/images/english.png')}
              style={styles.image}
            />
            <Text style={styles.languageTitle}>
              <>{t('changeLanguage.english')} EN</>
            </Text>
            <View style={styles.radioPosition}>
              <StyledRadio
                onClick={() => changeLanguage('en')}
                selected={lang == 'en'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  },
);

ChangeLanguage.displayName = 'Change Language';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  image: {
    width: 25,
    height: 11,
    marginTop: 15,
    marginRight: 10,
  },
  iconStyle: {
    color: APP_COLORS.background.container_secondary,
    padding: 5,
  },
  radioPosition: {
    position: 'absolute',
    right: 0,
  },
  sectionView: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  titleStyle: {
    color: APP_COLORS.typography.body_text,
    //fontFamily: 'DMSans-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 10
  },
  sectionTitle: {
    color: APP_COLORS.typography.body_text,
    //fontFamily: 'DMSans-Regular',
    fontSize: 12,
    marginBottom: 40,
  },
  languageTitle: {
    color: APP_COLORS.typography.body_text,
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 10,
  },
  languageLogoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ChangeLanguage;
