import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { typography, radius, spacing, shadows } from '../../theme';
import { Dish } from '../../types/restaurant';
import { DietaryBadge } from '../common/DietaryBadge';
import { AddButton } from '../common/AddButton';

interface FoodCardHorizontalProps {
  dish: Dish;
  restaurantId?: number;
}

export const FoodCardHorizontal: React.FC<FoodCardHorizontalProps> = ({ dish, restaurantId }) => {
  const { colors, isDark } = useTheme();
  const { getDishQuantity, addToCart, updateQuantity } = useCart();

  const quantity = getDishQuantity(dish.id);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.surface : '#FFFFFF',
          borderColor: isDark ? colors.border : '#EFECE6',
        },
      ]}
    >
      <View style={styles.left}>
        <View style={styles.metaRow}>
          <DietaryBadge type={dish.dietaryType} size={15} />
          {dish.tag && (
            <View
              style={[
                styles.tagPill,
                {
                  backgroundColor: isDark ? colors.surfaceVariant : '#F2F4F6',
                  borderColor: isDark ? colors.border : '#E1E2E5',
                },
              ]}
            >
              <Text style={[typography.labelSm, { color: isDark ? '#D1D5DB' : colors.textSecondary }]}>
                {dish.tag}
              </Text>
            </View>
          )}
        </View>

        <Text
          numberOfLines={2}
          style={[
            typography.headlineSm,
            styles.title,
            { color: isDark ? '#FFFFFF' : colors.textPrimary },
          ]}
        >
          {dish.name}
        </Text>

        <Text style={[typography.currencyMd, styles.price, { color: colors.primary }]}>
          ₹{dish.price}
        </Text>

        {dish.description ? (
          <Text
            numberOfLines={2}
            style={[
              typography.bodySm,
              styles.description,
              { color: isDark ? '#9CA3AF' : colors.textSecondary },
            ]}
          >
            {dish.description}
          </Text>
        ) : null}
      </View>

      <View style={styles.right}>
        <Image
          source={{ uri: dish.image }}
          style={[styles.thumbnail, { backgroundColor: isDark ? '#222634' : '#E7E8EB' }]}
          resizeMode="cover"
        />
        <View style={styles.buttonWrapper}>
          <AddButton
            quantity={quantity}
            onAdd={() => addToCart(dish, restaurantId)}
            onIncrement={() => updateQuantity(dish.id, 1)}
            onDecrement={() => updateQuantity(dish.id, -1)}
            size="sm"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  left: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  tagPill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  title: {
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 4,
  },
  price: {
    fontWeight: '800',
    marginBottom: 6,
  },
  description: {
    lineHeight: 18,
  },
  right: {
    width: 96,
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 12,
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
