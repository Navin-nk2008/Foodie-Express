import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';
import { DietaryType } from '../../types/restaurant';

interface DietaryBadgeProps {
  type: DietaryType;
  size?: number;
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({ type, size = 15 }) => {
  const { colors, isDark } = useTheme();
  const isVeg = type === 'veg';

  const strokeColor = isVeg ? colors.veg : colors.nonVeg;
  const fillColor = isVeg ? colors.veg : colors.nonVeg;
  const bgColor = isDark ? '#111317' : '#FFFFFF';

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderColor: strokeColor,
          backgroundColor: bgColor,
        },
      ]}
    >
      {isVeg ? (
        <View
          style={[
            styles.vegDot,
            {
              width: size * 0.42,
              height: size * 0.42,
              borderRadius: (size * 0.42) / 2,
              backgroundColor: fillColor,
            },
          ]}
        />
      ) : (
        <Svg width={size * 0.55} height={size * 0.55} viewBox="0 0 10 10">
          <Polygon points="5,1 9,9 1,9" fill={fillColor} />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {},
});
