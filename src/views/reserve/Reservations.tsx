import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {userFavoritesSelector} from '../../redux/selectors/userSelectors';
import ReservationView from './ReservationView';
import Icon from 'react-native-vector-icons/Entypo';
import ReservationModal from './ReservationModal';
import { userReservationsSelector } from '../../redux/selectors/reserveSelectors';

export interface ReservationsProps {
  navigation: any;
  onPress(): () => void;
}

const Reservations: React.FC<ReservationsProps> = React.memo(({navigation}) => {
  const userReservations = useSelector(userReservationsSelector)
  const {t} = useTranslation('reservation');

  const [showModal, setModal] = useState(false);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {userReservations.length ? (
            <>
              <View style={{marginTop: 30}}>
                <FlatList
                  data={userReservations}
                  keyExtractor={(item, index) => item.emri}
                  renderItem={({item, index}) => (
                    <ReservationView
                      name={item.emri}
                      date={item.data}
                      nrPersonave={item.nrPersonave}
                    />
                  )}
                />
              </View>
            </>
          ) : (
            <View style={{marginTop: 180, marginHorizontal: 30}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: APP_COLORS.background.container_secondary,
                  textAlign: 'center',
                }}>
                {t('reserve.none')}
              </Text>
              <View>
                <Icon name="calendar" size={150} style={styles.settingsIconStyle} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setModal(true)}>
        <View style={styles.addSign}>
          <Icon
            name="plus"
            size={45}
            style={{color: APP_COLORS.background.container_primary}}
          />
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <ReservationModal closeModal={setModal} />
      </Modal>
    </>
  );
});

Reservations.displayName = 'Reservations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  titleStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 22,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
    textAlign: 'center',
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: APP_COLORS.background.container_triary,
    backgroundColor: APP_COLORS.background.container_triary,
    width: 60,
    height: 60,
    position: 'absolute',
    right: 30,
    bottom: 25,
  },
  addSign: {
    alignItems: 'center',
    marginTop: 5,
  },
  settingsIconStyle: {
    color: APP_COLORS.background.container_secondary,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default Reservations;
