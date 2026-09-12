import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius } from '../../theme';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
}) => {
  const { colors, isDark } = useTheme();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.surfaceVariant : '#FFFFFF',
          borderColor: colors.primaryContainer,
          height: isSm ? 28 : 32,
          minWidth: isSm ? 74 : 86,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onDecrement}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}
        style={styles.button}
      >
        <Text style={[styles.symbol, { color: colors.primaryContainer, fontSize: isSm ? 15 : 18 }]}>
          −
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          typography.labelMd,
          styles.quantity,
          { color: isDark ? '#FFFFFF' : colors.textPrimary },
        ]}
      >
        {quantity}
      </Text>

      <TouchableOpacity
        onPress={onIncrement}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
        style={styles.button}
      >
        <Text style={[styles.symbol, { color: colors.primaryContainer, fontSize: isSm ? 15 : 18 }]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.pill,
    borderWidth: 1.5,
    paddingHorizontal: 8,
  },
  button: {
    width: 24,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontWeight: '800',
    textAlign: 'center',
  },
  quantity: {
    fontWeight: '700',
    minWidth: 18,
    textAlign: 'center',
  },
});
