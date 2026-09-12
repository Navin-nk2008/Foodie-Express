import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing } from '../../theme';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
}) => {
  const { colors, isDark } = useTheme();

  const activeBg = isDark ? '#3D1B12' : '#FFF1ED';
  const inactiveBg = isDark ? colors.surface : '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? activeBg : inactiveBg,
          borderColor: selected ? colors.primaryContainer : (isDark ? colors.border : '#EFECE6'),
        },
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          typography.labelMd,
          styles.label,
          {
            color: selected ? colors.primaryContainer : (isDark ? colors.textPrimary : '#191C1E'),
            fontWeight: selected ? '700' : '500',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.gutterSm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
  label: {},
});
