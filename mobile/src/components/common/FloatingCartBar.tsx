import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { typography, radius, spacing, shadows } from '../../theme';

interface FloatingCartBarProps {
  onPress: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({ onPress }) => {
  const { colors, isDark } = useTheme();
  const { cart, itemCount } = useCart();

  if (!cart || itemCount === 0) {
    return null;
  }

  const itemsLabel = `${itemCount} item${itemCount > 1 ? 's' : ''}`;

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        style={[
          styles.innerBar,
          shadows.modal,
          {
            backgroundColor: isDark ? '#1A1D26' : '#191C1E',
            borderColor: isDark ? '#2A2E3D' : 'rgba(255, 255, 255, 0.1)',
          },
        ]}
      >
        <View style={styles.left}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryContainer }]}>
            <Ionicons name="bag-handle" size={17} color="#FFFFFF" />
          </View>

          <View>
            <View style={styles.countRow}>
              <Text style={[typography.labelLg, styles.itemCountText]}>{itemsLabel}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={[typography.currencyMd, styles.priceText]}>₹{cart.grandTotal}</Text>
            </View>
            <Text style={[typography.bodySm, styles.subtext]}>
              Taxes and delivery calculated next
            </Text>
          </View>
        </View>

        <View style={[styles.viewCartBtn, { backgroundColor: colors.primaryContainer }]}>
          <Text style={[typography.labelLg, styles.btnText]}>View Cart</Text>
          <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md + 60, // Above bottom tabs
    zIndex: 99,
  },
  innerBar: {
    borderRadius: radius.xl,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemCountText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dot: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  priceText: {
    color: '#FFDAD2',
    fontWeight: '800',
  },
  subtext: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  viewCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    gap: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
