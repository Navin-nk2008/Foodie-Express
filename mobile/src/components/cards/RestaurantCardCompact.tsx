import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing, shadows } from '../../theme';
import { Restaurant } from '../../types/restaurant';

interface RestaurantCardCompactProps {
  restaurant: Restaurant;
  onPress: () => void;
}

export const RestaurantCardCompact: React.FC<RestaurantCardCompactProps> = ({
  restaurant,
  onPress,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        styles.card,
        shadows.card,
        {
          backgroundColor: isDark ? colors.surface : '#FFFFFF',
          borderColor: isDark ? colors.border : '#EFECE6',
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.etaPill}>
          <Ionicons name="time-outline" size={10} color="#FFFFFF" />
          <Text style={[typography.labelSm, styles.etaText]}>{restaurant.deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            numberOfLines={1}
            style={[
              typography.labelLg,
              styles.name,
              { color: isDark ? '#FFFFFF' : colors.textPrimary },
            ]}
          >
            {restaurant.name}
          </Text>

          <View style={[styles.ratingBadge, { backgroundColor: colors.veg }]}>
            <Ionicons name="star" size={9} color="#FFFFFF" />
            <Text style={[typography.labelSm, styles.ratingText]}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={[typography.bodySm, styles.cuisines, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}
        >
          {restaurant.cuisines[0]} • {restaurant.distance}
        </Text>

        <View style={styles.footerRow}>
          <Text style={[typography.labelMd, { color: colors.primary, fontWeight: '700' }]}>
            ₹{restaurant.priceForTwo} for two
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  etaPill: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(25, 28, 30, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    gap: 3,
  },
  etaText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  name: {
    flex: 1,
    fontWeight: '700',
    fontSize: 13,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.pill,
    gap: 2,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  cuisines: {
    marginTop: 2,
    fontSize: 11,
  },
  footerRow: {
    marginTop: 6,
  },
});
