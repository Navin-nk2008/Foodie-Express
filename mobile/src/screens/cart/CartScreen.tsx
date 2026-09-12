import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { AppHeader } from '../../components/common/AppHeader';
import { DietaryBadge } from '../../components/common/DietaryBadge';
import { QuantityStepper } from '../../components/common/QuantityStepper';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { EmptyState } from '../../components/common/EmptyState';
import { typography, spacing, radius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { cart, updateQuantity, removeItem, applyCoupon, clearCart } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!cart || cart.items.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Your Cart" onBack={() => navigation.goBack()} />
        <EmptyState
          icon="shopping-bag"
          title="Your Cart is Empty"
          description="Looks like you haven't added any delicious dishes yet. Explore our top restaurants now!"
          actionTitle="Explore Menu"
          onAction={() => navigation.navigate('MainTabs', { screen: 'HomeTab' } as any)}
        />
      </View>
    );
  }

  const handleApplyCoupon = (code: string) => {
    applyCoupon(code);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Your Cart"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity onPress={clearCart}>
            <Text style={[typography.labelSm, { color: colors.nonVeg, fontWeight: '700' }]}>
              Clear
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Restaurant Header Summary */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={styles.restTitleRow}>
            <View style={[styles.restIconBox, { backgroundColor: isDark ? '#261612' : '#FFF1ED' }]}>
              <Ionicons name="restaurant" size={20} color={colors.primaryContainer} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[typography.headlineSm, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
                {cart.restaurant.name}
              </Text>
              <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                Delivery in {cart.restaurant.deliveryTime} • {cart.restaurant.distance}
              </Text>
            </View>
          </View>
        </View>

        {/* Cart Line Items */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <Text style={[typography.titleMd, styles.cardTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            Order Items ({cart.itemCount})
          </Text>

          {cart.items.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                idx < cart.items.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? colors.border : '#F2F4F6',
                },
              ]}
            >
              <DietaryBadge type={item.dietaryType} size={15} />

              <View style={styles.itemDetails}>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.bodyMd,
                    styles.itemName,
                    { color: isDark ? '#FFFFFF' : colors.textPrimary },
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={[typography.labelMd, { color: colors.primary, fontWeight: '700' }]}>
                  ₹{item.price}
                </Text>
              </View>

              <QuantityStepper
                quantity={item.qty}
                onIncrement={() => updateQuantity(item.id, 1)}
                onDecrement={() => updateQuantity(item.id, -1)}
                size="sm"
              />

              <Text style={[typography.titleMd, styles.subtotalText, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
                ₹{item.subtotal}
              </Text>
            </View>
          ))}
        </View>

        {/* Coupons & Offers Section */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <View style={styles.couponHeader}>
            <MaterialIcons name="local-offer" size={18} color={colors.primaryContainer} />
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '700' }]}>
              Coupons & Offers
            </Text>
          </View>

          <View style={styles.couponInputRow}>
            <TextInput
              value={couponInput}
              onChangeText={setCouponInput}
              placeholder="Enter promo code"
              placeholderTextColor={isDark ? '#9CA3AF' : '#8F9499'}
              autoCapitalize="characters"
              style={[
                typography.labelMd,
                styles.couponInput,
                {
                  backgroundColor: isDark ? colors.surfaceVariant : '#F4F1EC',
                  borderColor: isDark ? colors.border : '#E1E2E5',
                  color: isDark ? '#FFFFFF' : colors.textPrimary,
                },
              ]}
            />
            <TouchableOpacity
              onPress={() => handleApplyCoupon(couponInput)}
              style={[styles.applyBtn, { backgroundColor: colors.primaryContainer }]}
            >
              <Text style={[typography.labelMd, { color: '#FFFFFF', fontWeight: '700' }]}>Apply</Text>
            </TouchableOpacity>
          </View>

          {cart.availableCoupons && (
            <View style={styles.availableCoupons}>
              {cart.availableCoupons.map((c) => {
                const isApplied = cart.coupon === c.code;
                return (
                  <TouchableOpacity
                    key={c.code}
                    activeOpacity={0.8}
                    onPress={() => handleApplyCoupon(isApplied ? '' : c.code)}
                    style={[
                      styles.couponPill,
                      {
                        backgroundColor: isApplied
                          ? (isDark ? '#261612' : '#FFF3F0')
                          : (isDark ? colors.surfaceVariant : '#F2F4F6'),
                        borderColor: isApplied ? colors.primaryContainer : 'transparent',
                      },
                    ]}
                  >
                    <View style={styles.couponPillLeft}>
                      <Text
                        style={[
                          typography.labelSm,
                          {
                            color: isApplied ? colors.primaryContainer : (isDark ? '#FFFFFF' : colors.textPrimary),
                            fontWeight: '800',
                          },
                        ]}
                      >
                        {c.code}
                      </Text>
                      <Text numberOfLines={1} style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary, fontSize: 11 }]}>
                        {c.description}
                      </Text>
                    </View>
                    <Text
                      style={[
                        typography.labelSm,
                        { color: isApplied ? colors.veg : colors.primaryContainer, fontWeight: '700' },
                      ]}
                    >
                      {isApplied ? 'APPLIED ✓' : 'TAP TO USE'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Bill Summary */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? colors.surface : '#FFFFFF',
              borderColor: isDark ? colors.border : '#EFECE6',
            },
          ]}
        >
          <Text style={[typography.titleMd, styles.cardTitle, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
            Bill Summary
          </Text>

          <View style={styles.billRow}>
            <Text style={[typography.bodyMd, { color: isDark ? '#D1D5DB' : colors.textSecondary }]}>
              Item Subtotal
            </Text>
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
              ₹{cart.subtotal}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={[typography.bodyMd, { color: isDark ? '#D1D5DB' : colors.textSecondary }]}>
              Delivery Fee
            </Text>
            <Text
              style={[
                typography.titleMd,
                { color: cart.deliveryFee === 0 ? colors.veg : (isDark ? '#FFFFFF' : colors.textPrimary) },
              ]}
            >
              {cart.deliveryFee === 0 ? 'FREE' : `₹${cart.deliveryFee}`}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={[typography.bodyMd, { color: isDark ? '#D1D5DB' : colors.textSecondary }]}>
              Taxes & Restaurant Packing (5%)
            </Text>
            <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary }]}>
              ₹{cart.tax}
            </Text>
          </View>

          {cart.discount > 0 && (
            <View style={styles.billRow}>
              <Text style={[typography.bodyMd, { color: colors.veg, fontWeight: '600' }]}>
                Coupon Discount ({cart.coupon})
              </Text>
              <Text style={[typography.titleMd, { color: colors.veg, fontWeight: '700' }]}>
                - ₹{cart.discount}
              </Text>
            </View>
          )}

          <View style={[styles.grandTotalRow, { borderTopColor: isDark ? colors.border : '#EFECE6' }]}>
            <View>
              <Text style={[typography.titleMd, { color: isDark ? '#FFFFFF' : colors.textPrimary, fontWeight: '800' }]}>
                To Pay
              </Text>
              <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
                Inclusive of all taxes
              </Text>
            </View>
            <Text style={[typography.headlineSm, { color: colors.primary, fontWeight: '800' }]}>
              ₹{cart.grandTotal}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Footer Bar */}
      <View
        style={[
          styles.checkoutBar,
          shadows.modal,
          {
            backgroundColor: isDark ? colors.surface : '#FFFFFF',
            borderTopColor: isDark ? colors.border : '#EFECE6',
          },
        ]}
      >
        <View style={styles.checkoutBarLeft}>
          <Text style={[typography.bodySm, { color: isDark ? '#9CA3AF' : colors.textSecondary }]}>
            Total Amount
          </Text>
          <Text style={[typography.headlineSm, { color: colors.primary, fontWeight: '800' }]}>
            ₹{cart.grandTotal}
          </Text>
        </View>

        <PrimaryButton
          title="Proceed to Checkout"
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkoutBtn}
          icon={<MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 110,
    gap: spacing.md,
  },
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  restTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  restIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
  },
  subtotalText: {
    fontWeight: '700',
    minWidth: 44,
    textAlign: 'right',
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  couponInputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  couponInput: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
  },
  applyBtn: {
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableCoupons: {
    gap: 6,
    marginTop: 4,
  },
  couponPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  couponPillLeft: {
    flex: 1,
    paddingRight: 8,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  grandTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutBarLeft: {
    flex: 1,
  },
  checkoutBtn: {
    flex: 1.5,
    height: 46,
  },
});
