import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import {useSelector} from 'react-redux';
import ReservationView from './ReservationView';
import Icon from 'react-native-vector-icons/Entypo';
import ReservationModal from './ReservationModal';
import { userReservationsSelector } from '../../redux/selectors/reserveSelectors';
import SearchBar from '../../components/SearchBar';
import { IReservation } from '../../models/IReservation';

export interface ReservationsProps {
}

const Reservations: React.FC<ReservationsProps> = React.memo(() => {
  const userReservations = useSelector(userReservationsSelector)
  const {t} = useTranslation('reservation');

  const [showModal, setModal] = useState(false);
  const [reservations, setReservations] = useState(userReservations);
  const [searchRes, setSearch] = useState('');

  const onSearch = React.useCallback(async (searchVal: string) => {
    setSearch(searchVal);
    const newData: IReservation[] = userReservations?.filter((item: any) => {
      // Applying filter for the inserted text in search bar
      const itemData = item?.emri
        ? item?.emri
            ?.toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        : ''
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
      const textData = searchVal.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setReservations(newData);
  }, [reservations, userReservations]);

  useEffect(() => {
    setReservations(userReservations);
    onSearch(searchRes);
  }, [userReservations]);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {userReservations.length ? (
            <>
              <View style={{marginTop: 25}}>
                <SearchBar
                  placeholder={t('reserve.search')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  label={t('reserve.search')}
                  onChangeText={onSearch}
                />
              </View>
              <View style={{marginTop: 30}}>
                <FlatList
                  data={reservations}
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
                <Icon
                  name="calendar"
                  size={150}
                  style={styles.settingsIconStyle}
                />
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
    marginHorizontal: 18,
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
