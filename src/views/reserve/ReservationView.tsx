import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import { useCallback, useState } from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, Image, TouchableOpacity, Modal, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import {APP_COLORS} from '../../assets/styles/colors';
import { removeReservations } from '../../redux/actions/reserveActions';

export interface ReservationViewProps {
  name: string;
  date: string;
  nrPersonave: string;
}

const ReservationView: React.FC<ReservationViewProps> = React.memo(
  ({
    name, date, nrPersonave
  }) => {
    const {t} = useTranslation('reservation');
    const dispatch = useDispatch();

    const [showModal, setModal] = useState(false);

    const deleteReservation = useCallback(async () => {
      setModal(false);
      await dispatch(removeReservations(name));
    }, []);

    return (
      <>
        <View style={styles.container}>
          <View style={[styles.sectionView, {marginTop: 15}]}>
            <Text style={styles.textStyle}>{t('view.name') + ': ' + name}</Text>
          </View>
          <View style={styles.sectionView}>
            <Text style={styles.textStyle}>{t('view.date') + ': ' + date}</Text>
          </View>
          <View style={[styles.sectionView, {marginBottom: -5}]}>
            <Text style={styles.textStyle}>
              {t('view.nrPers') + ': ' + nrPersonave}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Icon name="trash" size={20} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{t('modal.sureDelete')}</Text>
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[
                    styles.modalButton,
                    {marginRight: 5, backgroundColor: 'white'},
                  ]}
                  onPress={() => setModal(false)}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        marginTop: 9,
                        color: APP_COLORS.background.container_triary,
                      },
                    ]}>
                    {t('modal.cancel')}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, {marginLeft: 5}]}
                  onPress={() => deleteReservation()}>
                  <Text style={[styles.textStyle, {marginTop: 9}]}>
                    {t('modal.confirm')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  },
);

ReservationView.displayName = 'ReservationView';

const styles = StyleSheet.create({
  label: {
    //fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  container: {
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: APP_COLORS.background.container_secondary,
    borderWidth: 2,
    borderColor: APP_COLORS.background.container_triary,
    marginBottom: 15,
    width: '100%',
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    color: APP_COLORS.background.extra,
    textAlign: 'center'
  },
  sectionView: {
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  iconStyle: {
    color: APP_COLORS.background.extra,
    left: 145,
    bottom: 75,
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
  },
  modalButton: {
    borderRadius: 20,
    borderColor: APP_COLORS.background.container_secondary,
    borderWidth: 2,
    backgroundColor: APP_COLORS.background.container_secondary,
    height: 40,
    width: 150,
  },
  modalTitle: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
  },
});

export default ReservationView;
