import * as React from 'react';
import {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageURISource,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {APP_COLORS} from '../../assets/styles/colors';
import {addCount, removeCount, removeOrder} from '../../redux/actions/orderActions';

export interface OrderViewProps {
  emri: string;
  sasia: number;
  cmimi: number;
  foto: ImageURISource;
}

const OrderView: React.FC<OrderViewProps> = React.memo(
  ({emri, sasia, cmimi, foto}) => {
    const dispatch = useDispatch();

    const onDecrease = useCallback(async () => {
      if (sasia <= 1) {
        deleteOrder();
      } else {
        await dispatch(
          removeCount({foto: foto, emri: emri, cmimi: cmimi, sasia: sasia}),
        );
      }
    }, [sasia]);
    const onIncrease = useCallback(async () => {
      await dispatch(
        addCount({foto: foto, emri: emri, cmimi: cmimi, sasia: 1}),
      );
    }, [sasia]);

    const deleteOrder = useCallback(async () => {
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
            <Text style={styles.textStyle}>{cmimi * sasia + ' Lek'}</Text>
          </View>
          <View
            style={styles.counterButtons}>
            <TouchableOpacity
              onPress={() => onDecrease()}
              style={styles.increase}>
              <Text style={styles.increaseIcon}>-</Text>
            </TouchableOpacity>
            <View style={{width: 25, alignSelf: 'center'}}>
              <Text style={styles.counterNumber}>{sasia}</Text>
            </View>
            <TouchableOpacity
              onPress={() => onIncrease()}
              style={styles.increase}>
              <Text style={styles.increaseIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{borderWidth: 0.5, width: '92%', borderColor: 'black', alignSelf: 'center'}}></View>
      </>
    );
  },
);

OrderView.displayName = 'OrderView';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    margin: 15,
    width: '100%',
    marginLeft: 12,
  },
  textStyle: {
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
    color: APP_COLORS.background.container_secondary,
  },
  counterNumber: {
    fontSize: 20,
    textAlign: 'center',
    color: APP_COLORS.background.container_triary,
  },
  counterButtons: {
    flexDirection: 'row',
    marginLeft: '2.5%',
    borderWidth: 2,
    borderColor: APP_COLORS.background.container_secondary,
    backgroundColor: APP_COLORS.background.container_primary,
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
