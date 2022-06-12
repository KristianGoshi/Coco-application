import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {APP_COLORS} from '../../assets/styles/colors';
import {removeOrder} from '../../redux/actions/orderActions';

export interface OrderViewProps {
  emri: string;
  sasia: number;
  cmimi: number;
  foto: string
}

const OrderView: React.FC<OrderViewProps> = React.memo(
  ({emri, sasia, cmimi, foto}) => {
    const {t} = useTranslation('order');
    const dispatch = useDispatch();

    const [counter, setCounter] = useState(sasia);

    const onDecrease = () => {
      console.log("dd", counter)
      if (counter <= 1) {
        deleteOrder();
      }
      setCounter(counter - 1);
    };
    const onIncrease = () => {
      setCounter(counter + 1);
    };

    const deleteOrder = useCallback(async () => {
      console.log(foto, emri, cmimi, sasia)
      await dispatch(removeOrder({foto: foto, emri: emri, cmimi: cmimi, sasia: sasia}));
    }, []);

    return (
      <>
        <View style={styles.container}>
          <Image
            source={foto}
            style={styles.image}
          />
          <View style={styles.sectionView}>
            <Text style={styles.textStyle}>{emri}</Text>
            <Text style={styles.textStyle}>{cmimi * counter + ' Lek'}</Text>
          </View>
          <View
            style={styles.counterButtons}>
            <TouchableOpacity
              onPress={() => onDecrease()}
              style={styles.increase}>
              <Text style={styles.increaseIcon}>-</Text>
            </TouchableOpacity>
            <View style={{width: 25, alignSelf: 'center'}}>
              <Text style={styles.increaseIcon}>{counter}</Text>
            </View>
            <TouchableOpacity
              onPress={() => onIncrease()}
              style={styles.increase}>
              <Text style={styles.increaseIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  },
);

OrderView.displayName = 'OrderView';

const styles = StyleSheet.create({
  label: {
    //fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    margin: 15,
    width: '100%',
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
    textAlign: 'left',
    marginBottom: 5,
  },
  sectionView: {
    marginLeft: 18,
    alignSelf: 'center',
    width: 115,
  },
  iconStyle: {
    color: APP_COLORS.background.container_triary,
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
  increase: {
    marginHorizontal: 5,
    borderColor: APP_COLORS.background.container_triary,
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  increaseIcon: {
    fontSize: 20,
    textAlign: 'center',
    color: APP_COLORS.background.container_triary,
  },
  counterButtons: {
    flexDirection: 'row',
    marginLeft: 15,
    borderWidth: 2,
    borderColor: APP_COLORS.background.container_secondary,
    borderRadius: 12,
    paddingVertical: 4,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 20,
  },
});

export default OrderView;
