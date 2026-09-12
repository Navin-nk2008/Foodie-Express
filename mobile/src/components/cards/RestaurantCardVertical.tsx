import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography, radius, spacing, shadows } from '../../theme';
import { Restaurant } from '../../types/restaurant';

interface RestaurantCardVerticalProps {
  restaurant: Restaurant;
  onPress: () => void;
  onToggleFavorite?: () => void;
}

export const RestaurantCardVertical: React.FC<RestaurantCardVerticalProps> = ({
  restaurant,
  onPress,
  onToggleFavorite,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
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
      <View style={styles.imageWrapper}>
        <Image source={{ uri: restaurant.image }} style={styles.image} resizeMode="cover" />

        {/* ETA Pill */}
        <View style={styles.etaBadge}>
          <Ionicons name="time-outline" size={12} color="#FFFFFF" />
          <Text style={[typography.labelSm, styles.etaText]}>{restaurant.deliveryTime}</Text>
        </View>

        {/* Favorite Heart Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onToggleFavorite}
          style={[
            styles.favButton,
            { backgroundColor: isDark ? 'rgba(26, 29, 38, 0.85)' : 'rgba(255, 255, 255, 0.9)' },
          ]}
        >
          <Ionicons
            name={restaurant.isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={restaurant.isFavorite ? colors.primaryContainer : (isDark ? '#FFFFFF' : '#191C1E')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text
            numberOfLines={1}
            style={[
              typography.headlineSm,
              styles.name,
              { color: isDark ? '#FFFFFF' : colors.textPrimary },
            ]}
          >
            {restaurant.name}
          </Text>

          <View style={[styles.ratingPill, { backgroundColor: colors.veg }]}>
            <Ionicons name="star" size={12} color="#FFFFFF" />
            <Text style={[typography.labelSm, styles.ratingText]}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={[typography.bodySm, styles.cuisines, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}
        >
          {restaurant.cuisines.join(' • ')}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={13} color={colors.primaryContainer} />
            <Text style={[typography.bodySm, { color: isDark ? '#D1D5DB' : colors.textSecondary }]}>
              {restaurant.distance}
            </Text>
          </View>

          <Text style={styles.metaDot}>•</Text>

          <Text style={[typography.bodySm, { color: isDark ? '#D1D5DB' : colors.textSecondary }]}>
            ₹{restaurant.priceForTwo} for two
          </Text>
        </View>

        {restaurant.offer ? (
          <View style={[styles.offerStrip, { backgroundColor: isDark ? '#261612' : '#FFF3F0' }]}>
            <MaterialIcons name="local-offer" size={14} color={colors.primaryContainer} />
            <Text
              numberOfLines={1}
              style={[typography.labelSm, { color: colors.primaryContainer, fontWeight: '700' }]}
            >
              {restaurant.offer}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  etaBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(25, 28, 30, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    gap: 4,
  },
  etaText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  favButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontWeight: '700',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    gap: 3,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cuisines: {
    marginTop: 4,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaDot: {
    color: '#9CA3AF',
  },
  offerStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.sm,
    marginTop: 4,
  },
});
