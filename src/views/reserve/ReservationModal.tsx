import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {userFavoritesSelector} from '../../redux/selectors/userSelectors';
import TextInput from '../../components/Input';
import DatePicker from 'react-native-date-picker';
import Button from '../../components/Button';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { setReservations } from '../../redux/actions/reserveActions';

export interface ReservationModalProps {
  closeModal: any
}

const ReservationModal: React.FC<ReservationModalProps> = React.memo(({closeModal}) => {
  const {t} = useTranslation('reservation');
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date);
  const [nrPers, setPers] = useState('');
  const [open, setOpen] = useState(false);
  const falseDate = moment(new Date).format('MMMM Do YYYY, h:mm a');

  const changeText = (text: any, type: string) => {
    if (type == 'name') {
      setName(text);
    } else if (type == 'date') {
      setDate(text);
    } else if (type == 'persona') {
      setPers(text);
    }
  };

  const createReservation = useCallback(async () => {
    closeModal(false);
    await dispatch(setReservations([{emri: name, data: moment(date).format('MMMM Do YYYY, h:mm a'), nrPersonave: nrPers}]))
  }, [name, date, nrPers]);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{t('modal.title')}</Text>
        <View style={styles.textInput}>
          <TextInput
            placeholder={t('modal.name')}
            autoCapitalize="none"
            label={t('modal.name')}
            onChangeText={text => changeText(text, 'name')}
          />
        </View>
        <View style={[styles.textInput, {marginTop: -10}]}>
          <TextInput
            placeholder={t('modal.persona')}
            autoCapitalize="none"
            label={t('modal.persona')}
            onChangeText={text => changeText(text, 'persona')}
          />
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginTop: 10}}
          onPress={() => setOpen(true)}>
          <View>
            <Icon
              name="calendar-alt"
              size={30}
              style={{color: APP_COLORS.background.container_secondary}}
            />
          </View>
          <View style={{marginTop: 8, marginLeft: 15}}>
            <Text style={{color: APP_COLORS.background.container_secondary}}>
              {moment(date).format('MMMM Do YYYY, h:mm a') != falseDate
                ? moment(date).format('MMMM Do YYYY, h:mm a')
                : t('modal.chooseDate')}
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Pressable
            style={[styles.modalButton, {marginRight: 5, backgroundColor: 'white'}]}
            onPress={() => closeModal(false)}>
            <Text style={[styles.textStyle, {marginTop: 8, color: APP_COLORS.background.container_secondary}]}>{t('modal.cancel')}</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, {marginLeft: 5}]}
            onPress={() => createReservation()}>
            <Text style={[styles.textStyle, {marginTop: 8}]}>{t('modal.confirm')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

ReservationModal.displayName = 'ReservationModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
  },
  textInput: {
    alignSelf: 'center',
    width: '90%',
  },
  modalButton: {
    borderRadius: 20,
    borderColor: APP_COLORS.background.container_secondary,
    borderWidth: 2,
    backgroundColor: APP_COLORS.background.container_secondary,
    height: 40,
    width: 125,
  },
});

export default ReservationModal;