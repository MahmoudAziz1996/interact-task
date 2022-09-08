import {StyleSheet, Text, View} from 'react-native';
import PropType from 'prop-types';
import React from 'react';
import {Button} from './Button';
import {Colors} from '../assets/theme/colors';

const ListFooter = ({onPress, loading}) => {
  return (
    <View style={styles.container}>
      <Button
        fullWidth
        loading={loading}
        title={'Load More'}
        background={Colors.primary}
        onPress={onPress}
      />
    </View>
  );
};

export {ListFooter};
ListFooter.prototype = {
  onPress: PropType.func.isRequired,
  loading: PropType.bool,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
  },
});
