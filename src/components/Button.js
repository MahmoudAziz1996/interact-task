import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../assets/theme/colors';
import PropTypes from 'prop-types';

const Button = ({onPress, background, title, fullWidth, style, loading}) => {
  const backgroundColor = background || Colors.secondary;
  const width = fullWidth ? '100%' : 'auto';

  return (
    <View>
      <TouchableOpacity
        disabled={loading}
        style={[
          styles.button,
          {
            backgroundColor: backgroundColor,
            width,
          },
          style,
        ]}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export {Button};

Button.prototype = {
  onPress: PropTypes.func.isRequired,
  background: PropTypes.string,
  loading: PropTypes.bool || false,
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});
