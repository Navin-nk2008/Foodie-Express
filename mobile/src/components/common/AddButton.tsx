import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius } from '../../theme';
import { QuantityStepper } from './QuantityStepper';

interface AddButtonProps {
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

export const AddButton: React.FC<AddButtonProps> = ({
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  size = 'md',
}) => {
  const { colors, isDark } = useTheme();

  if (quantity > 0) {
    return (
      <QuantityStepper
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        size={size}
      />
    );
  }

  const isSm = size === 'sm';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onAdd}
      style={[
        styles.button,
        {
          backgroundColor: isDark ? colors.surfaceVariant : '#FFFFFF',
          borderColor: colors.primaryContainer,
          height: isSm ? 28 : 32,
          paddingHorizontal: isSm ? 10 : 14,
        },
      ]}
    >
      <Text style={[styles.plus, { color: colors.primaryContainer }]}>+</Text>
      <Text
        style={[
          typography.labelMd,
          styles.text,
          { color: isDark ? '#FFFFFF' : colors.textPrimary },
        ]}
      >
        ADD
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 1.5,
    gap: 4,
  },
  plus: {
    fontSize: 16,
    fontWeight: '800',
  },
  text: {
    fontWeight: '700',
  },
});
