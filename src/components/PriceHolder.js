import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../assets/theme/colors';

const priceType = {total: 'Total', sup: 'Sup'};

const PriceHolder = ({price, type}) => {
  let title = type == priceType.total ? 'Total Dues' : 'Total to pay';
  return (
    <View style={styles.wrapper}>
      <Text style={styles.price}>{price} LE</Text>
      <Text style={styles.title}>{title} </Text>
    </View>
  );
};

export {PriceHolder};

PriceHolder.propTypes = {
  price: PropTypes.number.isRequired,
};
const styles = StyleSheet.create({
  wrapper: {
    minWidth: 100,
    height: 100,
    backgroundColor: Colors.red,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
  },
  title: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 8,
  },
});
