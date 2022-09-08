import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Switch, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../assets/theme/colors';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {assets} from '../assets/images';

const TransactionItem = props => {
  const {amount, dueDate, onSelect, accountId, toggleAvailability} = props;
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    if (
      (isEnabled && !toggleAvailability().ableToUnSelect) ||
      (!isEnabled && !toggleAvailability().ableToSelect)
    ) {
      if (!toggleAvailability().ableToUnSelect) {
        Alert.alert('Transactions should be selected in order ');
        return;
      }
    }
    setIsEnabled(prev => !prev);
    onSelect();
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <FastImage
          // source={{uri: 'https://unsplash.it/400/400?image=1'}}
          source={assets.images.creditCard}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.date}>{moment(dueDate).format('YYYY-MM-DD')}</Text>
        <Text numberOfLines={1} style={styles.description}>
          Member ID:{'  '} <Text style={styles.memberId}>{accountId}</Text>
        </Text>
        <Text style={styles.price}>
          Amount:{'  '}
          <Text style={{color: Colors.blue}}>{amount.toFixed(2)} </Text>
        </Text>
      </View>
      <View style={styles.swichContainer}>
        <Switch
          trackColor={{false: Colors.grayShade, true: Colors.Malibu}}
          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
          thumbColor={isEnabled ? Colors.white : Colors.midGray}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default React.memo(TransactionItem);

TransactionItem.propTypes = {
  amount: PropTypes.number.isRequired,
  dueDate: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  toggleAvailability: PropTypes.func,
};
const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.offWhite,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  details: {
    flex: 1,
    paddingHorizontal: 8,
  },
  description: {
    fontsize: 8,
    color: Colors.grayShade,
    marginTop: 12,
  },
  swichContainer: {
    justifyContent: 'center',
  },
  price: {
    color: Colors.darkGray,
    fontWeight: '600',
    color: Colors.grayShade,
  },
  memberId: {
    fontWeight: '600',
    color: Colors.black,
  },
});
