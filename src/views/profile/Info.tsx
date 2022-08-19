import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Linking
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableText from '../../components/TouchableText';

export interface InfoProps {
}

const Info: React.FC<InfoProps> = React.memo(
  () => {
    const {t} = useTranslation('user');
    const callNumber = () => {
      Linking.openURL(`tel:${+355694042345}`);
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.infoLogoWrapper}>
            <Icon name="info-circle" size={120} style={styles.iconStyle} />
          </View>
          <View style={{marginTop: 35}}>
            <Text style={styles.sectionTitle}>{t('info.oraret')}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textStyle}>{'• Restaurant: '}</Text>
              <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>
                {'7:00am - 22:00pm'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textStyle}>{'• Delivery: '}</Text>
              <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>
                {'9:00am - 21:00pm'}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 35}}>
            <Text style={styles.sectionTitle}>{t('info.tel')}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textStyle}>
                {'• ' + t('info.call') + ': '}
              </Text>
              <View style={{marginTop: 10}}>
                <TouchableText
                  touchableText={'0694042345'}
                  onPress={() => callNumber()}
                  fontSize={16}
                />
              </View>
            </View>
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
    marginHorizontal: 18,
    marginTop: 20,
  },
  iconStyle: {
    color: APP_COLORS.background.container_triary,
    padding: 5,
  },
  textStyle: {
    color: APP_COLORS.background.container_secondary,
    fontSize: 16,
    marginTop: 10,
  },
  sectionTitle: {
    color: APP_COLORS.background.container_triary,
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
