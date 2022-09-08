import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PriceHolder, Button} from '../components';
import PropTypes from 'prop-types';
import {Colors} from '../assets/theme/colors';

const ListHeader = ({totalAmount, selectedAmount}) => {
  return (
    <View style={styles.container}>
      <PriceHolder price={totalAmount || 0} type="Total" />
      <Button title={'Pay'} fullWidth />
      <PriceHolder price={selectedAmount || 0} />
    </View>
  );
};

export {ListHeader};

ListHeader.prototype = {
  totalAmount: PropTypes.number.isRequired,
  selectedAmount: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'space-around',
    marginBottom: 8,
    alignItems: 'center',
  },
});
