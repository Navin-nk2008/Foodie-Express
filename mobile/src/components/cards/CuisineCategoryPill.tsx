import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing } from '../../theme';
import { Cuisine } from '../../types/restaurant';

interface CuisineCategoryPillProps {
  cuisine: Cuisine;
  isSelected?: boolean;
  onPress: () => void;
}

export const CuisineCategoryPill: React.FC<CuisineCategoryPillProps> = ({
  cuisine,
  isSelected = false,
  onPress,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <View
        style={[
          styles.avatarWrapper,
          {
            borderColor: isSelected ? colors.primaryContainer : 'transparent',
            backgroundColor: isDark ? colors.surface : '#FFFFFF',
          },
        ]}
      >
        <Image source={{ uri: cuisine.image }} style={styles.image} resizeMode="cover" />
      </View>

      <Text
        numberOfLines={1}
        style={[
          typography.labelSm,
          styles.name,
          {
            color: isSelected
              ? colors.primaryContainer
              : (isDark ? '#D1D5DB' : colors.textPrimary),
            fontWeight: isSelected ? '800' : '600',
          },
        ]}
      >
        {cuisine.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 68,
    marginRight: spacing.sm,
  },
  avatarWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    padding: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 27,
  },
  name: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 11,
  },
});
