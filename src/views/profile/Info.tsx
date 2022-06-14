import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface InfoProps {
  navigation: any;
}

const Info: React.FC<InfoProps> = React.memo(
  ({navigation}) => {
    const {t, i18n} = useTranslation('user');

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.infoLogoWrapper}>
            <Icon name="info-circle" size={120} style={styles.iconStyle} />
          </View>
          <View style={{marginTop: 35}}>
            <Text style={styles.sectionTitle}>{t('info.oraret')}</Text>
            <Text style={styles.textStyle}>
              {'• Restaurant: 7:00am - 22:00pm'}
            </Text>
            <Text style={styles.textStyle}>
              {'• Delivery: 9:00am - 21:00pm'}
            </Text>
          </View>
          <View style={{marginTop: 35}}>
            <Text style={styles.sectionTitle}>{t('info.tel')}</Text>
            <Text style={styles.textStyle}>
              {'• ' + t('info.call') + ': 0694042345'}
            </Text>
          </View>
          <View style={{marginTop: 35}}>
            <Text style={styles.sectionTitle}>{t('info.location')}</Text>
            <Text style={[styles.textStyle, {paddingRight: 20}]}>
              {'• Shkolla e Mesme e gjuheve te Huaja, Rruga e Elbasanit'}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  },
);

Info.displayName = 'Change Language';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  iconStyle: {
    color: APP_COLORS.background.container_triary,
    padding: 5,
  },
  textStyle: {
    color: APP_COLORS.background.container_secondary,
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
    marginTop: 10,
  },
  sectionTitle: {
    color: APP_COLORS.background.container_triary,
    //fontFamily: 'DMSans-Regular',
    fontSize: 19,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  infoLogoWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Info;
